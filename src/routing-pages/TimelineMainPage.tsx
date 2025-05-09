import { useEffect, useState } from "react";
import axios from "axios";
import Timeline from "@/components/timeline";
import TimelineBar from "@/components/timeline-bar";
import { NavBar } from "@/components/NavBar";

const TimelineMainPage = () => {
  const [viewMode, setViewMode] = useState<"week" | "month" | "year">("month");
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      const startDate = new Date().toISOString().split("T")[0];

      try {
        const res = await axios.get("http://localhost:4000/api/memory/view", {
          params: {
            mode: viewMode,
            start: startDate
          }
        })
        setMemories(res.data);
      } catch (error) {
        console.log("Failed to fetch memories:", error);
      }
    }
    fetchMemories();
  }, [viewMode])


  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="relative mt-[-30px] flex h-[90vh] w-[100vw] items-center">
        <div className="absolute w-[100%]">
          <Timeline memories={memories}/>
        </div>
        <TimelineBar  />
      </div>
    </div>
  );
};

export { TimelineMainPage };
