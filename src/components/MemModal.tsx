import React, { useRef, useState, useEffect} from "react";
import { useMemModalContext } from "./context";
import { useEditingContext } from "./context";

// TODO: Make memory modals reusable, input values { contentType, position, date }
// Maybe use date to uniquely identify which memory the modals belong to
// Make sure to set an unique key for each memory component ex date-something
export type MemModalType = {
    id: string, // new Date()
    body: string, // What the modal holds
    date: string, //YYYY-MM-DD
    position: { x: number; y: number }
};

const MemModal = ({
  memModal,
  id, 
  updatePosition,
  memPageRef,
}: {
  memModal: MemModalType,
  id:string,
  updatePosition: (id: string, newPosition: { x: number; y: number }) => void,
  memPageRef: React.RefObject<HTMLDivElement>
}) => {

  const [position, setPosition] = useState(memModal.position);
  const { memModals, setMemModals } = useMemModalContext();
  const { isEditMode } = useEditingContext();

  //When dragging around, memory modal must stay in bound

  //FIXME: If time implement, for now use if mouse out of memory page disable move

  // const setInBounds = (card: HTMLDivElement, mouseMoveDir = { x: 0, y: 0 }) => {
  //   const container = memPageRef.current!.getBoundingClientRect(); // Get memory page bounds
  //   const cardRect = card.getBoundingClientRect(); // Get modal bounds

  //   // Calculate new positions
  //   let newX = card.offsetLeft - mouseMoveDir.x;
  //   let newY = card.offsetTop - mouseMoveDir.y;

  //   // Prevent moving out of bounds
  //   newX = Math.max(0, Math.min(newX, container.width - cardRect.width));
  //   newY = Math.max(0, Math.min(newY, container.height - cardRect.height));

  //   return { x: newX, y: newY };
  // };

  // Helper function to move memory modal to top when selected
  const bringToTop = (card: HTMLDivElement) => {
    const otherCards = document.getElementsByClassName(
      "memory-modal",
    ) as HTMLCollectionOf<HTMLDivElement>;

    if (card.style.zIndex === "999") return;

    card.style.zIndex = "999";

    Array.from(otherCards).forEach((otherCard: HTMLDivElement) => {
      if (otherCard !== card) {
        otherCard.style.zIndex = String(
          Math.max(Number(otherCard.style.zIndex) - 1, 0),
        );
      }
    });
  };

  const handleDelete = (id: string) => {
    const updatedModules = memModals.filter((modal) => modal.id !== id);
    setMemModals(updatedModules);
  };

  const memModalRef = useRef<HTMLDivElement>(null); 
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number, 
    startY: number, 
    lastX: number,
    lastY: number
  }>({
    startX: 0, 
    startY: 0, 
    lastX: 0, 
    lastY: 0
  })


  useEffect(()=> {
    if (!isEditMode) return; // Disable drag unless in edit mode
    if (!memModalRef.current || !memPageRef.current) return; // make sure the elements in question actually exist

    const memPage = memPageRef.current;
    const memModal = memModalRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isEditMode) return; // Disable drag unless in edit mode

      // Reset `lastX` and `lastY` before a new drag starts
      coords.current.lastX = memModal.offsetLeft;
      coords.current.lastY = memModal.offsetTop;


      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      bringToTop(memModal);
    };

    const handleMouseUp = () => {
      isClicked.current = false;
      // Store new position
      coords.current.lastX = memModal.offsetLeft;
      coords.current.lastY = memModal.offsetTop;
      updatePosition(id, { x: coords.current.lastX, y: coords.current.lastY});
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      memModal.style.top = `${nextY}px`;
      memModal.style.left = `${nextX}px`;

      setPosition({x:nextX, y:nextY}); //Update positon locally as move is performed
      updatePosition(memModal.id, { x: nextX, y: nextY }); // Update global state

    };

    memModal.addEventListener("mousedown", handleMouseDown);
    memModal.addEventListener("mouseup", handleMouseUp);
    memPage.addEventListener("mousemove", handleMouseMove);
    memPage.addEventListener("mouseleave", handleMouseUp);

    const cleanUp = () => {
      memModal.removeEventListener("mousedown", handleMouseDown);
      memModal.removeEventListener("mouseup", handleMouseUp);
      memPage.removeEventListener("mousemove", handleMouseMove);
      memPage.removeEventListener("mouseleave", handleMouseUp);

    }

    return cleanUp;
  }, [isEditMode]);

  return (
    <div
      className="memory-modal absolute h-[200px] w-[200px] rounded-lg border border-black bg-white p-6"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={memModalRef}
    >
      Mock Memory Modal
      {isEditMode && (
        <button
          className="delete-button absolute right-2 top-2 rounded bg-gray-200 px-2 py-1 text-xs text-white hover:bg-gray-400"
          onClick={() => handleDelete(id)}
        >
          {" "}
          X{" "}
        </button>
      )}
    </div>
  );
};

export { MemModal };
