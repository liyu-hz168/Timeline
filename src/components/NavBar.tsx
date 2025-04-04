import { useState } from "react";
import { Settings } from "./Settings";

// Timeline                  week|month|year                       settings    sign out
// Font: PP Editorial New, in tailwind font-serif vertically stretched out looks similar
const NavBar = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    //Implement the zooming in and out when clicked on the three views 
    return (
      <div className="grid w-full grid-cols-3 items-center justify-center p-6 text-center text-black">
        {/* App name */}
        <div>
          <h1 className="scale-y-[1.25] text-left font-serif text-4xl">
            <span>Timeline.</span>
          </h1>
        </div>
        {/* View Navigation */}
        <div className="flex items-center gap-4 justify-self-center font-serif text-4xl">
          <button className="scale-y-[1.2] hover:underline">week</button>
          <div className="h-8 w-[2px] scale-y-[1.6] bg-gray-400"></div>
          <button className="scale-y-[1.2] hover:underline">month</button>
          <div className="h-8 w-[2px] scale-y-[1.6] bg-gray-400"></div>
          <button className="scale-y-[1.2] hover:underline">year</button>
        </div>
        {/* Buttons TODO: add zooming frame */}
        <div className="text-right">
          <button
            className="mr-4 scale-y-[1.2] rounded-full bg-gray-700 px-3 py-1 font-serif text-xl text-white hover:bg-gray-500"
            onClick={() => setIsSettingsOpen(true)}
          >
            settings
          </button>
          <Settings
            isSettingsOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
          <button className="scale-y-[1.2] rounded-full bg-gray-700 px-3 py-1 font-serif text-xl text-white hover:bg-gray-500">
            sign out
          </button>
        </div>
      </div>
    );
};

export { NavBar };
