import LeftArrow from '../assets/graphics/arrow-left.png'
import RightArrow from '../assets/graphics/arrow-right.png'

export default function TimelineBar(){
    return(
        <div className="relative flex flex-row justify-center items-center w-[100vw] z-0">
            <img id="left-arrow" src={LeftArrow} alt="move-left" className='w-[50px] mr-[20px] ml-[4.8vw] cursor-pointer'/>
            <div className="h-[0.4rem] w-[100%] bg-black"></div>
            <img id="right-arrow" src={RightArrow} alt="move-right" className='w-[50px] ml-[20px] mr-[4.8vw] cursor-pointer'/>
        </div>
    )
}