export default function Thumbnail({text, image = ""} : {text: string, image: string}){ //image is a path
    return (
        <span className="relative z-10 thumbnail flex flex-col justify-center items-center rounded-[28px] bg-white border-[3px] border-black min-h-[120px]">
            <span className="absolute z-20 font-bold bg-white top-[-15px] pl-1 pr-1"> 18TH </span>
            {image && 
            <div className="p-4">
                <img className="" src={image} alt="thumbnail image"/>
                <span>{text}</span>
            </div>
            }
        </span>
    )
}