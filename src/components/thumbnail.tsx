export default function Thumbnail({text, image = null} : {text: string, image: string}){ //image is a path
    return (
        <div className="relative flex justify-center" key={text.length}>
                <div className="absolute z-0 w-[0.4rem] h-[200px] bg-black top-1/2 -translate-y-1/2 mt-[-200px]"></div>
                <span className="z-10 thumbnail flex flex-col justify-center items-center rounded-[28px] bg-white border-[3px] border-black min-h-[120px]">
                    {image && 
                    <>
                        <img src={image} alt="thumbnail image"/>
                        <span>{text}</span>
                    </>
                    }
                </span>
        </div>
    )
}