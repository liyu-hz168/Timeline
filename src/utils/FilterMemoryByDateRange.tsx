import { mockMemories } from "@/data/mockMemories";
import { mockMemoryCards } from "@/data/mockMemoryCards";

export class thumbnailInfo {
  text: string | null;
  image: string | null;
  date: string | null;
  constructor(text: string | null, image: string | null, date: string | null) {
    this.text = text;
    this.image = image;
    this.date = date;
  }
}

export function filterMemoryByWeek(startDate: string): thumbnailInfo[] {
  const thumbnailInfoArray: thumbnailInfo[] = [];
  //   const seenDates = new Set<string>();

  const date = new Date(startDate);
  const dayOfWeek = date.getDay();
  const mondayOffset = dayOfWeek === 1 ? 0 : 1 - dayOfWeek;

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() + mondayOffset);

  // Get all 7 dates of the week
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    weekDates.push(d.toISOString().split("T")[0]);
  }

  // Get memory cards for the week
  const weeklyMemoryCards = mockMemoryCards.filter((card) =>
    weekDates.includes(card.date),
  );

  for (const card of weeklyMemoryCards) {
    const memory = mockMemories[card.memoryID];
    if (!memory) continue;

    const text = memory.type === "text" ? memory.content : null;
    const image = memory.type === "image" ? memory.content : null;

    // Look for existing thumbnailInfo for this date
    let existingThumbnail = thumbnailInfoArray.find(
      (thumbnail) => thumbnail.date === card.date,
    );

    if (!existingThumbnail) {
      // If no existing entry, create a new one
      existingThumbnail = new thumbnailInfo(null, null, card.date);
      thumbnailInfoArray.push(existingThumbnail);
    }

    // Add text and/or image if they don't exist yet
    if (text && !existingThumbnail.text) {
      existingThumbnail.text = text;
    }
    if (image && !existingThumbnail.image) {
      existingThumbnail.image = image;
    }

    // If both text and image are null, add a "no preview"
    if (!existingThumbnail.text && !existingThumbnail.image) {
      existingThumbnail.text = "no preview";
    }
  }

  console.log(thumbnailInfoArray);
  return thumbnailInfoArray;
}

export function filterMemoryByMonth(startDate: string): thumbnailInfo[] {
  const thumbnailInfoArray: thumbnailInfo[] = [];
  //   const seenDates = new Set<string>();

  const date = new Date(startDate);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed: Jan = 0

  // Filter memory cards that match the year and month
  const monthlyMemoryCards = mockMemoryCards.filter((card) => {
    const cardDate = new Date(card.date);
    return cardDate.getFullYear() === year && cardDate.getMonth() === month;
  });

  for (const card of monthlyMemoryCards) {
    const memory = mockMemories[card.memoryID];
    if (!memory) continue;

    const text = memory.type === "text" ? memory.content : null;
    const image = memory.type === "image" ? memory.content : null;

    // Look for existing thumbnailInfo for this date
    let existingThumbnail = thumbnailInfoArray.find(
      (thumbnail) => thumbnail.date === card.date,
    );

    if (!existingThumbnail) {
      // If no existing entry, create a new one
      existingThumbnail = new thumbnailInfo(null, null, card.date);
      thumbnailInfoArray.push(existingThumbnail);
    }

    // Add text and/or image if they don't exist yet
    if (text && !existingThumbnail.text) {
      existingThumbnail.text = text;
    }
    if (image && !existingThumbnail.image) {
      existingThumbnail.image = image;
    }

    // If both text and image are null, add a "no preview"
    if (!existingThumbnail.text && !existingThumbnail.image) {
      existingThumbnail.text = "no preview";
    }
  }
  console.log(thumbnailInfoArray);
  return thumbnailInfoArray;
}

export function filterMemoryByYear(startDate: string): thumbnailInfo[] {
  const thumbnailInfoArray: thumbnailInfo[] = [];
  const date = new Date(startDate);
  const year = date.getFullYear();

  for (let month = 0; month < 12; month++) {
    const monthlyCards = mockMemoryCards.filter((card) => {
      const cardDate = new Date(card.date);
      return cardDate.getFullYear() === year && cardDate.getMonth() === month;
    });

    if (monthlyCards.length === 0) continue; // No cards at all for this month

    for (const card of monthlyCards) {
      const memory = mockMemories[card.memoryID];
      if (!memory) continue;

      const text = memory.type === "text" ? memory.content : null;
      const image = memory.type === "image" ? memory.content : null;

      // Look for existing thumbnailInfo for this date
      let existingThumbnail = thumbnailInfoArray.find(
        (thumbnail) => thumbnail.date === card.date,
      );

      if (!existingThumbnail) {
        // If no existing entry, create a new one
        existingThumbnail = new thumbnailInfo(null, null, card.date);
        thumbnailInfoArray.push(existingThumbnail);
      }

      // Add text and/or image if they don't exist yet
      if (text && !existingThumbnail.text) {
        existingThumbnail.text = text;
      }
      if (image && !existingThumbnail.image) {
        existingThumbnail.image = image;
      }

      // If both text and image are null, add a "no preview"
      if (!existingThumbnail.text && !existingThumbnail.image) {
        existingThumbnail.text = "no preview";
      }
    }
  }

  return thumbnailInfoArray;
}
