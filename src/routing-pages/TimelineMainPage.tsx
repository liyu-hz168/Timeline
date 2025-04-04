import Timeline from "@/components/timeline";
import TimelineBar from "@/components/timeline-bar";
import { NavBar } from "@/components/NavBar";

const TimelineMainPage = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="relative flex h-[100vh] w-[100vw] items-center">
        <div className="absolute w-[100%]">
          <Timeline />
        </div>
        <TimelineBar />
      </div>
    </div>
  );
};

export { TimelineMainPage };
