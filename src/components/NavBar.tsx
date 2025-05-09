import { useState } from "react";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";

// Timeline                  week|month|year                       settings    sign out
// Font: PP Editorial New, in tailwind font-serif vertically stretched out looks similar
const NavBar = ({
  viewMode,
  setViewMode,
}: {
  viewMode: "week" | "month" | "year";
  setViewMode: (mode: "week" | "month" | "year") => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  //Implement the zooming in and out when clicked on the three views
  return (
    <div className="grid w-[100vw] grid-cols-3 items-center justify-center p-4 text-center text-black">
      {/* App name */}
      <div>
        <h1 className="scale-y-[1.1] text-left font-editorial text-4xl tracking-[-2px]">
          <span>Timeline.</span>
        </h1>
      </div>
      {/* View Navigation */}
      <div className="flex items-center gap-4 justify-self-center font-editorial text-4xl">
        <button className="scale-y-[1.1] hover:underline" id="week-button">
          week
        </button>
        <div className="h-8 w-[2px] scale-y-[1.6] bg-black"></div>
        <button
          className={`scale-y-[1.1] hover:underline ${viewMode === "month" ? "font-bold" : ""}`}
          id="month-button"
          onClick={() => setViewMode("month")}
        >
          month
        </button>
        <div className="h-8 w-[2px] scale-y-[1.6] bg-black"></div>
        <button
          className={`scale-y-[1.1] hover:underline ${viewMode === "year" ? "font-bold" : ""}`}
          id="year-button"
          onClick={() => setViewMode("year")}
        >
          year
        </button>
      </div>
      {/* Buttons TODO: add zooming frame */}
      <div className="text-right">
        <button
          className="mr-4 rounded-full bg-gray-700 px-3 py-1 font-editorial text-xl text-white hover:bg-gray-500"
          onClick={() => setIsSettingsOpen(true)}
        >
          settings
        </button>
        <Settings
          isSettingsOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <button
          className="rounded-full bg-gray-700 px-3 py-1 font-editorial text-xl text-white hover:bg-gray-500"
          onClick={() => navigate(`/`)}
        >
          sign out
        </button>
      </div>
    </div>
  );
};

export { NavBar };
