import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TimelineMainPage } from "./routing-pages/TimelineMainPage";
import { EditMemoryPage } from "./routing-pages/EditMemoryPage";
import { useState } from "react";
import LoginSignup from "./routing-pages/login-signup/LoginSignup";
import { MemModalContext, EditingContext } from "@/components/context";
import { MemoryCard } from "./components/MemoryCard";
import { mockMemoryCards } from "./data/mockMemoryCards";

function App() {
  const [memModals, setMemModals] = useState<MemoryCard[]>([...mockMemoryCards]);
  const [isEditMode, changeMode] = useState<boolean>(false);
  // FIXME
  // Function to update position of a modal
  const updateMemModalPosition = (
    id: string,
    newPosition: { x: number; y: number },
  ) => {
    setMemModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.id === id ? { ...modal, position: newPosition } : modal,
      );
      return updatedModals;
    });
  };
  return (
    <MemModalContext.Provider
      value={{ memModals, setMemModals, updateMemModalPosition }}
    >
      <EditingContext.Provider value={{ isEditMode, changeMode }}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/edit/:date" element={<EditMemoryPage />} />
            {/* use useParam to extract date from URL */}
            <Route path="/timeline" element={<TimelineMainPage/>}></Route>
          </Routes>
        </Router>
      </EditingContext.Provider>
    </MemModalContext.Provider>
  );
}


export default App;

