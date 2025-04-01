import { useState } from "react";
import Timeline from "./components/timeline";
import TimelineBar from "./components/timeline-bar";

function App() {
  return (
    <div className="relative flex items-center w-[100vw] h-[100vh]">
      <div className="absolute w-[100%]">
        <Timeline/>  
      </div>    
      <TimelineBar />
    </div>
  );
}

export default App;
