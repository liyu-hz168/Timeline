//import mockmemories...

import { start } from "repl";

class thumbnailInfo {
  constructor(text: string, image: string) {}
}

const mockMemoryCards = [];
const mockMemoryModules = new Map(); //with type

export function filterMemoryByWeek(startDate: string, rangeType: string) {
  //shows all days in a week, this is the default and will initially show current week
  const thumbnailInfoArray = [];

  const date = new Date(startDate);

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Adjust so that Monday is considered the start of the week
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // if it is a Sunday, go back 6 days
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() + mondayOffset);

  let weekArray = [];
  let weekMap = new Map();

  for (let i = 0; i < 7; i++) {
    const currDate = (startOfWeek.getDate() + i).toISOString().split("T")[0];
    weekArray = mockMemoryCards.filter(
      (memoryCard) => memoryCard.date === currDate,
    ); //all the memory cards with matching dates
  }

  weekArray.forEach((memoryCard) => {
    if (!weekMap.has(memoryCard.date)) {
      weekMap.set(memoryCard.data, null);
    }
  });
}

export function filterMemoryByMonth(startDate: string, rangeType: string) {
  //shows all the days in a month
}

export function filterMemoryByYear(startDate: string, rangeType: string) {
  //shows the months of each year
}

//FIXME: ADD ANOTHER TAB FOR YEARS

const formattedStart = startOfWeek.toISOString().split("T")[0];
