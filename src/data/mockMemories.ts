import { Memory} from "@/components/MemoryModule";

const mockMemories: Record<string, Memory> = {
  // Mock data for demonstration purposes
  "mem-1": {
    type: "text",
    content: "This is a text memory.",
  },
  "mem-2": {
    type: "image",
    content: "https://media1.tenor.com/m/fitGu2TwtHoAAAAd/cat-hyppy.gif", // Placeholder image URL
  },
  "mem-3": {
    type: "audio",
    content: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example audio file
  },
  "mem-4": {
    type: "video",
    content:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Example video file
  },
};

export { mockMemories }