import { MemoryCard } from "@/components/MemoryCard";

function getRandomPosition() {
  // Generate a random position within a certain range\
  return {
    x: Math.floor(Math.random() * 400), // Random x position (0-400px)
    y: Math.floor(Math.random() * 300), // Random y position (0-300px)
  };
}

function generateMemoryCards(startDate: string, numDays: number): MemoryCard[] {
  const memoryCards: MemoryCard[] = [];

  for (let i = 1; i <= numDays * 4; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(i / 4)); //increment the date by one day every 4 cards

    const card: MemoryCard = {
      id: `mem-card-${i}`,
      date: date.toISOString().split("T")[0], //date in YYYY-MM-DD format
      position: getRandomPosition(),
      memoryID: `mem-${i}`,
    };

    memoryCards.push(card);
  }

  return memoryCards;
}

const mockMemoryCards = generateMemoryCards("2025-03-31", 100);

export { mockMemoryCards };
