import LeftArrow from "../assets/graphics/arrow-left.png";
import RightArrow from "../assets/graphics/arrow-right.png";

export default function TimelineBar() {
  return (
    <div className="relative z-0 flex w-[100vw] flex-row items-center justify-center">
      <img
        id="left-arrow"
        src={LeftArrow}
        alt="move-left"
        className="ml-[4.8vw] mr-[20px] w-[50px] cursor-pointer"
      />
      <div className="h-[0.4rem] w-[100%] bg-black"></div>
      <img
        id="right-arrow"
        src={RightArrow}
        alt="move-right"
        className="ml-[20px] mr-[4.8vw] w-[50px] cursor-pointer"
      />
    </div>
  );
}
