import { Memory } from "@/components/MemoryModule";

function generateMockMemories(numMemories: number): Record<string, Memory> {
  const types = ["text", "image", "audio", "video"];
  const contents = [
    "This is a text memory from the time I went to Hawaii all those years ago...",
    "https://media1.tenor.com/m/fitGu2TwtHoAAAAd/cat-hyppy.gif", // Placeholder image URL
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example audio file
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Example video file
  ];

  const memories: Record<string, Memory> = {};

  for (let i = 1; i <= numMemories; i++) {
    const type = types[i % types.length];
    const content = contents[types.indexOf(type)];

    memories[`mem-${i}`] = {
      type,
      content,
    };
  }

  return memories;
}

const mockMemories: Record<string, Memory> = generateMockMemories(365);

export { mockMemories };
