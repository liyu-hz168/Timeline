import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TimelinePage } from "./routing-pages/TimelinePage";
import { EditMemoryPage } from "./routing-pages/EditMemoryPage";
import { useState } from "react";
import { MemModalContext, EditingContext } from "@/components/context";
import { MemModalType } from "./components/MemModal";
import Timeline from "./components/timeline";
import TimelineBar from "./components/timeline-bar";

function App() {
  const [memModals, setMemModals] = useState<MemModalType[]>([]);
  const [ isEditMode, changeMode ] = useState<boolean>(false);
  // FIXME 
  // Function to update position of a modal
  const updateMemModalPosition = (
    id: string,
    newPosition: { x: number; y: number },
  ) => {
    setMemModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.id === id ? { ...modal, position: newPosition } : modal
      );
      return updatedModals;
    });
  };

  return (
    <MemModalContext.Provider
      value={{ memModals, setMemModals, updateMemModalPosition }}
    >
      <EditingContext.Provider value ={{ isEditMode, changeMode }}>
        <Router>
          <Routes>
            <Route path="/" element={<TimelinePage />} />
            <Route path="/edit/:date" element={<EditMemoryPage />} />
            {/* use useParam to extract date from URL */}
          </Routes>
        </Router>
        <div className="relative flex h-[100vh] w-[100vw] items-center">
      <div className="absolute w-[100%]">
        <Timeline />
      </div>
      <TimelineBar />
    </div>
      </EditingContext.Provider>
    </MemModalContext.Provider>
  );
}


export default App;
