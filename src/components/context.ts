import { createContext, useContext } from "react";

// Save context for settings page
type SettingsContextType = {
  data: string[];
};
export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("Cannot use null context");
  }
  return context;
}

import { MemoryCard } from "./MemoryCard";

/* 
export type MemModalType = {
   id: string,
   body: string,
   date: string,
   position: { x: number; y: number }
}; 
*/

type MemModalContextType = {
  memModals: MemoryCard[];
  setMemModals: (arg: MemoryCard[]) => void;
  updateMemModalPosition: (
    id: string,
    newPosition: { x: number; y: number },
  ) => void;
};

export const MemModalContext = createContext<MemModalContextType | undefined>(
  undefined,
);

export function useMemModalContext() {
  const context = useContext(MemModalContext);
  if (context === undefined) {
    throw new Error("Cannot use null context");
  }
  return context;
}

//context for editing mode
type EditContextType = {
  isEditMode: boolean;
  changeMode: (arg: boolean) => void;
};
export const EditingContext = createContext<EditContextType | undefined>(
  undefined,
);

export function useEditingContext() {
  const context = useContext(EditingContext);

  if (context === undefined) {
    throw new Error("Cannot use null context");
  }
  return context;
}
