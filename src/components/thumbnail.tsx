import { useState, useEffect, useRef } from "react";

export default function Thumbnail({ text, image = "" }: { text: string; image: string }) {
    const [lineClamp, setLineClamp] = useState(2);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateLineClamp = () => {
            if (containerRef.current) {
                const height = containerRef.current.clientHeight;
                const computedStyle = window.getComputedStyle(containerRef.current);
                const lineHeight = parseFloat(computedStyle.lineHeight) || 17; // Fallback if line-height isn't defined
                const maxLines = Math.floor(height / (lineHeight+1));
                setLineClamp(maxLines);
                console.log(height)
            }
        };

        const resizeObserver = new ResizeObserver(updateLineClamp);
        resizeObserver.observe(containerRef.current);

        updateLineClamp();

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <span className="relative z-10 thumbnail flex flex-col justify-start items-center rounded-[28px] bg-white border-[3px] border-black">
            <span className="absolute z-20 font-bold bg-white top-[-15px] pl-1 pr-1">18TH</span>
            {image && (
                <div className="p-4 flex flex-col items-center w-full h-full overflow-hidden">
                    <img className="rounded-[15px] w-full h-auto" src={image} alt="thumbnail image" />
                    <div ref={containerRef} className="flex-1 h-[100%] w-[100%] mt-1">
                        <p
                            className="text-[16px] w-full overflow-hidden text-ellipsis"
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: lineClamp,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {text}
                        </p>
                    </div>
                </div>
            )}
        </span>
    );
}
