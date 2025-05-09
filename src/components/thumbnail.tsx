import { useState, useEffect, useRef } from "react";

export default function Thumbnail({
  text,
  image = "",
  date,
}: {
  text: string | null;
  image: string | null;
  date: string | null;
}) {
  //state to determine how many lines of text we can see
  const [lineClamp, setLineClamp] = useState(2);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateLineClamp = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        const computedStyle = window.getComputedStyle(containerRef.current);
        const lineHeight = parseFloat(computedStyle.lineHeight) || 17; //fallback if line-height isn't defined
        const maxLines = Math.floor(height / lineHeight);
        setLineClamp(maxLines);
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
    <span
      className="thumbnail relative z-10 flex flex-col items-center justify-start rounded-[28px] border-[3px] border-black bg-white"
      data-date={date}
    >
      <span className="absolute top-[-15px] z-20 bg-white pl-1 pr-1 font-bold">
        {date}
      </span>
      <div className="flex h-full w-full flex-col items-center overflow-hidden p-2">
        {image && (
          <img
            className="mb-1 h-auto w-full rounded-[16px]"
            src={image}
            alt="thumbnail image"
          />
        )}
        {text && (
          <div ref={containerRef} className="mt-1 h-[100%] w-[100%] flex-1">
            <p
              className="w-full overflow-hidden text-ellipsis text-[14px]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: lineClamp,
                WebkitBoxOrient: "vertical",
              }}
            >
              {text}
            </p>
          </div>
        )}
      </div>
    </span>
  );
}
