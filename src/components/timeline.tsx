import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import Thumbnail from "./thumbnail";
import {
  filterMemoryByWeek,
  filterMemoryByMonth,
  filterMemoryByYear,
  thumbnailInfo,
} from "@/utils/FilterMemoryByDateRange";
import { useNavigate } from "react-router-dom";
import RightArrow from "../assets/graphics/right-white.png";

export default function Timeline() {
  const scrollContainer1 = useRef<HTMLDivElement | null>(null);
  const scrollContainer2 = useRef<HTMLDivElement | null>(null);

  //this state will always show the date in the center
  const [currentDate, setCurrentDate] = useState(new Date());
  const [baseDate, setBaseDate] = useState(new Date());

  const [viewMode, setViewMode] = useState("month");

  const monthButton = document.getElementById("month-button");
  const weekButton = document.getElementById("week-button");
  const yearButton = document.getElementById("year-button");

  const thumbnails = useMemo(
    () => splitArray(viewShift(viewMode, currentDate)),
    [viewMode, currentDate],
  );

  monthButton?.addEventListener("click", () => {
    setViewMode("month");
    adjustThumbnailSize();
  });
  weekButton?.addEventListener("click", () => {
    setViewMode("week");
    adjustThumbnailSize();
  });
  yearButton?.addEventListener("click", () => {
    setViewMode("year");
    adjustThumbnailSize();
  });

  function DateToggler({ ddate }: { ddate: string }) {
    const shiftDate = (direction: "prev" | "next") => {
      const date = new Date(currentDate);
      if (viewMode === "year") {
        date.setFullYear(date.getFullYear() + (direction === "next" ? 1 : -1));
      } else if (viewMode === "month") {
        date.setMonth(date.getMonth() + (direction === "next" ? 1 : -1));
      } else {
        date.setDate(date.getDate() + (direction === "next" ? 7 : -7));
      }
      setCurrentDate(date);
      setBaseDate(date);
    };

    return (
      <div className="flex w-[100%] items-center justify-center rounded-[25px] bg-black p-3 font-editorial text-2xl text-white">
        <img
          onClick={() => shiftDate("prev")}
          className="mr-[10px] h-[20px] scale-x-[-1] cursor-pointer"
          src={RightArrow}
          alt=""
        />
        <div className="scale-y-[1.1] justify-center text-center">
          {viewMode === "year"
            ? new Date(ddate).getFullYear()
            : viewMode === "month"
              ? new Date(ddate).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })
              : new Date(ddate).toLocaleDateString()}
        </div>
        <img
          onClick={() => shiftDate("next")}
          className="ml-[10px] h-[20px] cursor-pointer"
          src={RightArrow}
          alt=""
        />
      </div>
    );
  }

  function viewShift(view: string, baseDate: Date): thumbnailInfo[] {
    const dateString = baseDate.toISOString().split("T")[0];
    if (view === "week") {
      return filterMemoryByWeek(dateString);
    } else if (view === "month") {
      return filterMemoryByMonth(dateString);
    } else {
      return filterMemoryByYear(dateString);
    }
  }

  function getWindowDimensions() {
    const { innerWidth: vwidth, innerHeight: vheight } = window;
    return {
      vwidth,
      vheight,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions(),
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const { vheight, vwidth } = useWindowDimensions();

  useEffect(() => {
    const leftArrow = document.getElementById("left-arrow");
    const handleLeftClick = () => {
      gsap.to([scrollContainer1.current, scrollContainer2.current], {
        scrollLeft: (index: number) =>
          index === 0
            ? (scrollContainer1.current?.scrollLeft ??
              -0.5 * (vwidth - 2 * (0.048 * vwidth + 70)))
            : (scrollContainer2.current?.scrollLeft ??
              -0.5 * (vwidth - 2 * (0.048 * vwidth + 70))),
        duration: 2,
        ease: "power2.out",
      });
    };

    if (leftArrow) {
      leftArrow.addEventListener("click", handleLeftClick);
    }

    return () => {
      if (leftArrow) {
        leftArrow.removeEventListener("click", handleLeftClick);
      }
    };
  }, [vwidth]);

  useEffect(() => {
    const rightArrow = document.getElementById("right-arrow");
    const handleLeftClick = () => {
      gsap.to([scrollContainer1.current, scrollContainer2.current], {
        scrollLeft: (index) =>
          index === 0
            ? scrollContainer1.current?.scrollLeft +
              0.5 * (vwidth - 2 * (0.048 * vwidth + 70)) //half the length of the gallery display
            : scrollContainer2.current?.scrollLeft +
              0.5 * (vwidth - 2 * (0.048 * vwidth + 70)),
        duration: 2,
        ease: "power2.out",
      });
    };

    if (rightArrow) {
      rightArrow.addEventListener("click", handleLeftClick);
    }

    return () => {
      if (rightArrow) {
        rightArrow.removeEventListener("click", handleLeftClick);
      }
    };
  }, [vwidth]);

  const adjustThumbnailSize = () => {
    const scrollContainers = [
      scrollContainer1.current,
      scrollContainer2.current,
    ];

    scrollContainers.forEach((container) => {
      if (!container) return;

      const thumbnails = container.querySelectorAll(".thumbnail");
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      thumbnails.forEach((thumbnail) => {
        const thumbnailRect = thumbnail.getBoundingClientRect();
        const thumbnailCenterX = thumbnailRect.left + thumbnailRect.width / 2;
        const distance = Math.abs(containerCenterX - thumbnailCenterX);
        const maxDistance = containerRect.width / 2;

        //calculate scale based on the distance
        //const scale = Math.max(0.45, Math.sin(1 - distance / maxDistance));
        //scaling based on gaussian curve
        const scale = Math.max(
          0.2,
          gaussian(0.7 * (1 - distance / maxDistance), 1, 0.7),
        );
        const height = 600 * scale;
        const width = 460 * scale;

        //apply width and height based on scale
        thumbnail.style.width = `${width}px`;
        thumbnail.style.height = `${height}px`;

        if (distance < 0.1 * vwidth) {
          setCurrentDate(new Date(thumbnail.getAttribute("data-date")));
        }
      });
    });
  };

  //run on load, so objects are alr that size
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      adjustThumbnailSize();
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scrollSpeed = vwidth * 0.0014; //SCROLL SPEED ADJUST HERE
      const delta = event.deltaY * scrollSpeed;

      gsap.to([scrollContainer1.current, scrollContainer2.current], {
        scrollLeft: (index) =>
          index === 0
            ? scrollContainer1.current?.scrollLeft + delta
            : scrollContainer2.current?.scrollLeft + delta,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    const container1 = scrollContainer1.current;
    const container2 = scrollContainer2.current;

    if (container1 && container2) {
      container1.addEventListener("wheel", handleWheel);
      container2.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container1 && container2) {
        container1.removeEventListener("wheel", handleWheel);
        container2.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      adjustThumbnailSize();
    };

    if (scrollContainer1.current) {
      scrollContainer1.current.addEventListener("scroll", handleScroll);
    }
    if (scrollContainer2.current) {
      scrollContainer2.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer1.current) {
        scrollContainer1.current.removeEventListener("scroll", handleScroll);
      }
      if (scrollContainer2.current) {
        scrollContainer2.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  //make thumbnail size responsive
  useEffect(() => {
    adjustThumbnailSize();
  }, [vwidth, baseDate]);

  const navigate = useNavigate();
  return (
    <div className="align-center z-50 flex w-[100vw] flex-col justify-center">
      {/* top scroll */}
      {/* dynamically calculated margins so always aligned with timeline */}
      <div
        className="gallery-wrap align-center flex items-center justify-center"
        style={{
          marginLeft: `${0.048 * vwidth + 70}px`,
          marginRight: `${0.048 * vwidth + 70}px`,
        }}
      >
        <div
          ref={scrollContainer1}
          className="thumbnail-gallery flex h-[45vh] w-[100vw] items-end overflow-x-scroll pb-4"
        >
          <div
            className="grid-cols-[auto auto auto auto auto auto auto] grid grid-flow-col items-end gap-[40px] p-[10px]"
            style={{
              marginLeft: `${0.3 * vwidth}px`,
              marginRight: `${0.3 * vwidth}px`,
            }}
          >
            {thumbnails[0].length > 0 &&
              thumbnails[0].map((e) => (
                <div
                  className="align-end relative flex justify-center"
                  key={e ? e.date : 1}
                >
                  <div className="absolute z-0 h-[500px] w-[0.4rem] bg-black"></div>
                  <button
                    onClick={() => {
                      navigate(`/edit/${e.date!}`);
                    }}
                  >
                    <Thumbnail
                      text={e ? e.text : null}
                      image={e ? e.image : null}
                      date={e ? e.date : null}
                    />
                  </button>
                </div>
              ))}
            {splitArray(viewShift(viewMode, currentDate))[0].length === 0 && (
              <div className="w-full text-center text-xl text-gray-400">
                No entries for this time range.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom scroll */}
      <div
        className="gallery-wrap align-end flex items-end justify-end"
        style={{
          marginLeft: `${0.048 * vwidth + 70}px`,
          marginRight: `${0.048 * vwidth + 70}px`,
        }}
      >
        <div
          ref={scrollContainer2}
          className="thumbnail-gallery flex h-[45vh] w-[100vw] overflow-x-scroll pt-4"
        >
          <div
            className="grid-cols-[auto auto auto auto auto] ml-[70px] mr-[70px] grid h-[100%] grid-flow-col gap-[40px] p-[10px]"
            style={{
              marginLeft: `${0.3 * vwidth + 70}px`,
              marginRight: `${0.3 * vwidth + 70}px`,
            }}
          >
            {thumbnails[1].length > 0 &&
              thumbnails[1].map((e) => (
                <div className="relative flex justify-center" key={e.date}>
                  <div className="absolute top-1/2 z-0 mt-[-200px] h-[200px] w-[0.4rem] -translate-y-1/2 bg-black"></div>
                  <Thumbnail
                    text={e ? e.text : null}
                    image={e ? e.image : null}
                    date={e ? e.date : null}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-auto fixed bottom-[20px] left-[20px] z-[100] select-none">
        <DateToggler ddate={currentDate} />
      </div>
      <div className="pointer-events-auto fixed bottom-[20px] right-[20px] z-[100]">
        <div className="flex w-[100%] select-none items-center justify-center rounded-[25px] bg-black p-3 font-editorial text-2xl text-white">
          + new memory
        </div>
      </div>
    </div>
  );
}

function gaussian(x, mean, stdDev) {
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  return coefficient * Math.exp(exponent);
}

function splitArray(arr: thumbnailInfo[]) {
  const evenIndexed: thumbnailInfo[] = [];
  const oddIndexed: thumbnailInfo[] = [];

  arr.forEach((item, index) => {
    if (index % 2 === 0) {
      evenIndexed.push(item);
    } else {
      oddIndexed.push(item);
    }
  });

  if (evenIndexed.length === 0) {
    return [[], []];
  }

  if (evenIndexed.length <= oddIndexed.length) {
    evenIndexed.push(oddIndexed[oddIndexed.length - 1]);
    oddIndexed.pop();
  }

  return [evenIndexed, oddIndexed];
}
