import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TimelinePage } from "./routing-pages/TimelinePage";
import { EditMemoryPage } from "./routing-pages/EditMemoryPage";
import { useState } from "react";
import { MemModalContext, EditingContext } from "@/components/context";
import { MemModalType } from "./components/MemModal";

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
      </EditingContext.Provider>
    </MemModalContext.Provider>
  );
}

export default App;
