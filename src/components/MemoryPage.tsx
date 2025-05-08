import { useRef, useEffect, useState } from "react";
import { MemModal, MemoryCard } from "./MemoryCard";
import { useMemModalContext, useEditingContext } from "./context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Each memory page should also be unique
// Unique key can be the date
// set up useState in a different file const [date, selectedNewDate] = useState(some selected date)
const MemoryPage = ({ date }: { date: string }) => {
  //Helper: loads memory modals associated to this date

  const loadMemForDate = (memModals: MemoryCard[], date: string) => {
    console.log("Loading mem for date: ", date);
    console.log(memModals)
    return memModals.filter((modal) => modal.date === date);
  };

  const memPageRef = useRef<HTMLDivElement>(null);
  const { memModals, setMemModals, updateMemModalPosition } = useMemModalContext();
  const { isEditMode, changeMode } = useEditingContext();
  const [curModals, setCurModals] = useState<MemoryCard[]>(() =>
    loadMemForDate(memModals, date),
  );

  useEffect(() => {
    setCurModals(loadMemForDate(memModals, date));
  }, [memModals]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    modalId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/api/editMemory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = res.data.url;
      console.log("Uploaded file URL:", fileUrl);

      const updated = memModals.map((m) =>
        m.id === modalId ? { ...m, memoryID: fileUrl } : m
      );
      setMemModals(updated);

    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Try again.");
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <div
        className="relative mx-auto h-[700px] w-[700px] overflow-auto rounded-lg border border-black bg-white p-4 shadow-lg"
        ref={memPageRef}
      >
        {/* Onclick should open up this componnet in the editing page, once in editing page, this button should disappear */}
        {!isEditMode && (
          <button
            className="absolute right-2 top-2 rounded bg-gray-200 py-1 text-xs text-white hover:bg-gray-400"
            onClick={() => {
              navigate(`/edit/${date}`);
              changeMode(true);
            }}
          >
            Edit
          </button>
        )}
        {/* FIXME: change key in the future, to match unique id in database once backend implemented ? */}
        {curModals.map((memModal: MemoryCard) => (
          <>
            <MemModal
              key={memModal.id}
              memModal={memModal}
              id={memModal.id}
              updatePosition={updateMemModalPosition}
              memPageRef={memPageRef}
            />
            {isEditMode && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={(e) => handleUpload(e, memModal.id)}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export { MemoryPage };
