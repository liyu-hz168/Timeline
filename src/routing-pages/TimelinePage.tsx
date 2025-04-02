import { NavBar } from "@/components/NavBar";
import { MemoryPage } from "@/components/MemoryPage";

const TimelinePage = () => {
  return (
    <>
      <NavBar />

      {/* FIXME: Delete later, left here for testing purposes */}
  
      {/* This date format can be achieved via const today = new Date().toISOString().split("T")[0]; "YYYY-MM-DD" */}
      <MemoryPage key={"2025-03-31"} date={"2025-03-31"} />
    </>
  );
};

export { TimelinePage };
