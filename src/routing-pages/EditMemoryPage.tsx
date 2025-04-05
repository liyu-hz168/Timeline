import { MemoryPage } from "@/components/MemoryPage";
import { useParams } from "react-router-dom";
import { useMemModalContext, useEditingContext } from "@/components/context";
import { useNavigate } from "react-router-dom";
import { MemoryCard } from "@/components/MemoryCard";

// Route `/edit/:date extract date
// Render the corresponding memory page in edit mode
const EditMemoryPage = () => {
  const { date } = useParams();
  const { memModals, setMemModals } = useMemModalContext();
  const { changeMode } = useEditingContext();

  // Formatting date to match figma design
  function formatDate(dateString: string): string {
    // Ensure we get the exact year, month, and day
    const [year, month, day] = dateString.split("-").map(Number);

    // Create a date object in local time
    const date = new Date(year, month - 1, day); // Month is 0-indexed

    const dayWithSuffix = `${day}${getDaySuffix(day)}`;
    const monthName = date.toLocaleString("en-US", { month: "long" }); // "March"
    const yearNumber = date.getFullYear(); // 2025

    return `${monthName} ${dayWithSuffix}, ${yearNumber}`;
  }

  // Helper function to get the day suffix (st, nd, rd, th)
  function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const dateTitle = formatDate(date!);
  //Default memory modal when created
  function newMemModal(): MemoryCard {
    return {
      id: new Date().toISOString(), // long date string, should be unique unless new modals created less than milisec apart
      date: date!, //YYYY-MM-DD
      position: { x: 0, y: 0 },
    };
  }

  const navigate = useNavigate();
  return (
    <div className="grid h-screen w-full grid-cols-4">
      {/* Left Toolbar */}
      <div className="col-span-1 flex flex-col items-center bg-gray-300 p-4 shadow-lg">
        Editing Page, more functions to be implemented ...
        <button
          className="mb-7 mr-4 scale-y-[1.2] rounded-full bg-gray-700 px-3 py-1 font-serif text-xl text-white hover:bg-gray-500"
          onClick={() => {
            const newModal = newMemModal();
            setMemModals([...memModals, newModal]);
          }}
        >
          Add Memory Modal
        </button>
        {/* FIXME: change routing path once fully set up */}
        <button
          className="mr-4 scale-y-[1.2] rounded-full bg-gray-700 px-3 py-1 font-serif text-xl text-white hover:bg-gray-500"
          onClick={() => {
            navigate(`/`);
            changeMode(false);
          }}
        >
          Return to Timeline
        </button>
      </div>

      {/* Right - Memory Editing Space */}
      <div className="col-span-3 flex items-center justify-center p-4">
        <div className="mb-1 grid w-full grid-rows-10 text-center">
          <div className="row-span-1 items-center justify-center">
            <span className="scale-y-[1.25] font-serif text-4xl">
              {dateTitle}
            </span>
          </div>
          <div className="row-span-9 flex items-center justify-center">
            <MemoryPage date={date || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditMemoryPage };
