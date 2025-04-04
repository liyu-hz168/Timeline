import { MemoryCard } from "@/components/MemoryCard";

function getRandomPosition() {
  // Generate a random position within a certain range\
  return {
    x: Math.floor(Math.random() * 400), // Random x position (0-400px)
    y: Math.floor(Math.random() * 300), // Random y position (0-300px)
  };
}

const mockMemoryCards: MemoryCard[] = [
  {
    id: "mem-card-1",
    date: "2025-03-31", // Example date in ISO format
    position: getRandomPosition(), // Random position for demonstration
    memoryID: "mem-1", // This should correspond to an actual memory in your memory store
  },
  
  {
    id: "mem-card-2",
    date: "2025-03-31", // Example date in ISO format
    position: getRandomPosition(), // Random position for demonstration
    memoryID: "mem-2", // This should correspond to an actual memory in your memory store
  },
  {
    id: "mem-card-3",
    date: "2025-03-31", // Example date in ISO format
    position: getRandomPosition(), // Random position for demonstration
    memoryID: "mem-3", // This should correspond to an actual memory in your memory store
  },
  {
    id: "mem-card-4",
    date: "2025-03-31", // Example date in ISO format
    position: getRandomPosition(), // Random position for demonstration
    memoryID: "mem-4", // This should correspond to an actual memory in your memory store
  },
];

export { mockMemoryCards };
