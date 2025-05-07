import Timeline from "@/components/timeline";
import TimelineBar from "@/components/timeline-bar";
import { NavBar } from "@/components/NavBar";
import PreviewCard from "@/components/PreviewCard";
import { Memory } from "@/components/MemoryModule";
import { useState } from "react";
import { PreviewMemory } from "@/components/MemoryModule";

type TimelineMainPageProps = {
  memories: Record<string, Memory>;
};


const TimelineMainPage = ({ memories }: TimelineMainPageProps) => {
  
  const [previewMemory, setPreviewMemory] = useState<PreviewMemory | null>(null);

  type MemoryCardProps = {
    memory: Memory;
    onPreview: (memory: Memory) => void;
  };

  const MemoryCard = ({ memory, onPreview }: MemoryCardProps) => (
    <div onClick={() => onPreview(memory)} className="cursor-pointer">
      {/* memory summary content */}
    </div>
  );

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="relative flex h-[100vh] w-[100vw] items-center">
      <div className="absolute w-[100%]">
        <Timeline
          onPreview={(previewData) =>
            setPreviewMemory({
              ...previewData,
              memoryModals: previewData.memoryModals.filter(
                (modal): modal is Memory & { type: "text" | "image" | "audio" | "video" } =>
                  modal.type === "text" || modal.type === "image" || modal.type === "audio" || modal.type === "video"
              ),
            })
          }
        />
      </div>
        <TimelineBar />
        <div className="mt-4 flex justify-center">
          {Object.values(memories).slice(0, 5).map((memory, idx) => (
            <MemoryCard
              key={idx}
              memory={memory}
              onPreview={(mem) =>
                setPreviewMemory({
                  created: "2025-01-01",
                  memoryModals: [mem],
                })
              }
            />
          ))}
        </div>
        {previewMemory && (
          <PreviewCard
            created={previewMemory.created}
            memoryModals={previewMemory.memoryModals
              .filter((modal): modal is Memory & { type: "text" | "image" } => modal.type === "text" || modal.type === "image")
              .map((modal, index) => ({
                ...modal,
                id: index, // add a fallback numeric ID
              }))}
            onClose={() => setPreviewMemory(null)}
            onExpand={() => alert("Expand view")}
          />
        )}
      </div>
    </div>
  );
};

export { TimelineMainPage };

