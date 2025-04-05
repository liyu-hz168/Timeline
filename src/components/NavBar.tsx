import { useState } from "react";
import { Settings } from "./Settings";

// Timeline                  week|month|year                       settings    sign out
// Font: PP Editorial New, in tailwind font-serif vertically stretched out looks similar
const NavBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  //Implement the zooming in and out when clicked on the three views
  return (
    <div className="grid w-[100vw] grid-cols-3 items-center justify-center p-4 text-center text-black">
      {/* App name */}
      <div>
        <h1 className="font-editorial scale-y-[1.1] text-left text-4xl tracking-[-2px]">
          <span>Timeline.</span>
        </h1>
      </div>
      {/* View Navigation */}
      <div className="font-editorial flex items-center gap-4 justify-self-center text-4xl">
        <button className="scale-y-[1.1] hover:underline" id="week-button">
          week
        </button>
        <div className="h-8 w-[2px] scale-y-[1.6] bg-black"></div>
        <button className="scale-y-[1.1] hover:underline" id="month-button">
          month
        </button>
        <div className="h-8 w-[2px] scale-y-[1.6] bg-black"></div>
        <button className="scale-y-[1.1] hover:underline" id="year-button">
          year
        </button>
      </div>
      {/* Buttons TODO: add zooming frame */}
      <div className="text-right">
        <button
          className="font-editorial mr-4 rounded-full bg-gray-700 px-3 py-1 text-xl text-white hover:bg-gray-500"
          onClick={() => setIsSettingsOpen(true)}
        >
          settings
        </button>
        <Settings
          isSettingsOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <button className="font-editorial rounded-full bg-gray-700 px-3 py-1 text-xl text-white hover:bg-gray-500">
          sign out
        </button>
      </div>
    </div>
  );
};

export { NavBar };
