import { useState } from "react";
import Timeline from "./components/timeline";
import TimelineBar from "./components/timeline-bar";
import Thumbnail from "./components/thumbnail";

function App() {
  return (
    <div className="relative flex items-center w-[100vw] h-[100vh]">
      <div className="absolute w-[100%]">
        <Timeline/>  
      </div>    
      <TimelineBar />
    </div>
  );
  // <div className="relative flex items-center w-[100vw] h-[100vh]">
  //     <Thumbnail 
  //       text="Lorem Ipsum"
  //       image="/sample1.jpg"
  // //     />
  // //   </div>
  // );
}

export default App;
