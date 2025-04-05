import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Thumbnail from "./thumbnail";

export default function Timeline() {
  const dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const scrollContainer1 = useRef<HTMLDivElement | null>(null);
  const scrollContainer2 = useRef<HTMLDivElement | null>(null);

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

  const rightArrow = document.getElementById("right-arrow");

  useEffect(() => {
    const leftArrow = document.getElementById("left-arrow");
    console.log("click");
    const handleLeftClick = () => {
      gsap.to([scrollContainer1.current, scrollContainer2.current], {
        scrollLeft: (index) =>
          index === 0
            ? scrollContainer1.current?.scrollLeft -
              0.5 * (vwidth - 2 * (0.048 * vwidth + 70))
            : scrollContainer2.current?.scrollLeft -
              0.5 * (vwidth - 2 * (0.048 * vwidth + 70)),
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
    console.log("click");
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
  }, [vwidth]);

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
            {Array.from({ length: 25 }).map((e, index) => (
              <div
                className="align-end relative flex justify-center"
                key={index}
              >
                <div className="absolute z-0 h-[500px] w-[0.4rem] bg-black"></div>
                <Thumbnail text={dummyText} image="/sample1.jpg" />
              </div>
            ))}
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
            {Array.from({ length: 24 }).map((e, index) => (
              <div className="relative flex justify-center" key={index}>
                <div className="absolute top-1/2 z-0 mt-[-200px] h-[200px] w-[0.4rem] -translate-y-1/2 bg-black"></div>
                <Thumbnail text={dummyText} image="/sample1.jpg" />
              </div>
            ))}
          </div>
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
