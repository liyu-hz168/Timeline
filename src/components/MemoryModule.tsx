import { mockMemories } from "../data/mockMemories"; // Assuming you have a mock data file for demonstration purposes

export interface Memory {
  type: "text" | "image" | "audio" | "video";
  content: string;
}

export type PreviewMemory = {
  created: string;
  memoryModals: Memory[];
};

function lookUpMemory(memoryID: string): Memory | null {
  if (!memoryID || memoryID === "") {
    console.error("No memoryID provided");
    return null;
  }
  /*
  TODO: fetch memory from a backend or a local store, for now using mock data for demonstration
  */
  // For demonstration purposes, using mock data directly. Replace with actual data fetching logic.
  return mockMemories[memoryID];
}

export default function MemoryModule(m: { memoryID: string }) {
  // If no memory is provided, return empty div
  const memory = lookUpMemory(m.memoryID);
  if (!memory) {
    return <div className="empty-memory">No content available</div>;
  }

  switch (memory.type) {
    case "text":
      return (
        <div className="text-memory">
          <p>{memory.content}</p>
        </div>
      );
    case "image":
      return (
        <div className="image-memory">
          <img src={memory.content} alt="memory" className="h-auto w-full" />
        </div>
      );
    case "audio":
      return (
        <div className="audio-memory">
          <audio controls className="w-full">
            <source src={memory.content} type="audio/mpeg" />
          </audio>
        </div>
      );
    case "video":
      return (
        <div className="video-memory">
          <video controls className="w-full">
            <source src={memory.content} type="video/mp4" />
          </video>
        </div>
      );
    default:
      // Default case if type is not recognized
      console.error(`Unsupported memory type: ${memory.type}`);
      return (
        <div className="unknown-memory">
          <p>Unsupported memory type</p>
        </div>
      );
  }
}

export { MemoryModule };
