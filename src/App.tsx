import Timeline from "./components/timeline";
import TimelineBar from "./components/timeline-bar";

function App() {
  return (
    <div className="relative flex h-[100vh] w-[100vw] items-center">
      <div className="absolute w-[100%]">
        <Timeline />
      </div>
      <TimelineBar />
    </div>
  );
}

export default App;
