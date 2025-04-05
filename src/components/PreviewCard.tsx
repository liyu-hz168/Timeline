// import 

type MemoryModalType = "text" | "image";

type MemoryModal = {
  id: number;
  type: MemoryModalType;
  content: string;
}

type PreviewCardProp = {
  created: string;
  memoryModals: MemoryModal[];
  onClose: () => void;
  onExpand: () => void;
}

function PreviewCard({ created, memoryModals, onClose, onExpand }: PreviewCardProp) {
  const title = new Date(created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[800px] max-w-[95%] relative border border-gray-200">
        <div className="flex justify-between items-center mb-4 px-1">
          <button onClick={onExpand} title="Expand" className="text-xl">
            ⤢
          </button>
          <h2 className="text-xl font-serif text-center flex-1 -ml-6">{title}</h2>
          <button
            onClick={onClose}
            title="Close"
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {memoryModals.map((modal) => {
            if (modal.type === "image") {
              return (
                <img
                  key={modal.id}
                  src={modal.content}
                  alt="memory"
                  className="rounded-xl w-full max-h-[300px] object-contain"
                />
              );
            }

            if (modal.type === "text") {
              return (
                <div
                  key={modal.id}
                  className="bg-white border rounded-xl p-3 text-sm shadow w-full"
                >
                  {modal.content}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;