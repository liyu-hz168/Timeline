import { useState } from "react";
import PreviewCard from "./components/PreviewCard";

type MemoryModalType = "text" | "image";

type MemoryModal = {
  id: number;
  type: MemoryModalType;
  content: string;
}

type Memory = {
  id: number;
  created: string;
  memoryModals: MemoryModal[]
}

function App() {
  const mockMemories: Memory[] = [
    { 
      id: 1,
      created: "2020-01-01",
      memoryModals: [
        {
          id: 101,
          type: "image",
          content:
            "https://res.cloudinary.com/icelandtours/g_auto,f_auto,c_fill,w_2048,q_auto:good/northern_lights_above_glacier_lagoon_v2osk_unsplash_7d39ca647f.jpg"
        },
        {
          id: 102,
          type: "text",
          content:
            "This phenomenon is created by giant flares from the sun or solar storms. These happen about 150 million kilometers away from Earth. The flares then send blasts of charged particles towards our planet."
        }
      ]
    }
  ]

  const [showPreview, setShowPreview] = useState(true);

  const mockData = mockMemories[0];

  

  return (
    <div>
      {showPreview && (
        <PreviewCard
          created={mockData.created}
          memoryModals={mockData.memoryModals}
          onClose={() => setShowPreview(false)}
          onExpand={() => alert("Expand view!")}
        />
      )}
    </div>
  )
}

export default App;