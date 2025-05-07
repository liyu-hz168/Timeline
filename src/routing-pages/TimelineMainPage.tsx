import Timeline from "@/components/timeline";
import TimelineBar from "@/components/timeline-bar";
import { NavBar } from "@/components/NavBar";

const TimelineMainPage = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="relative mt-[-30px] flex h-[90vh] w-[100vw] items-center">
        <div className="absolute w-[100%]">
          <Timeline />
        </div>
        <TimelineBar />
      </div>
    </div>
  );
};

export { TimelineMainPage };
