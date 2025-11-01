import Image from "next/image"
import { CharacterType } from "@/types/types";
import AnimationWrapper from "./AnimationWrapper";

export default function CharacterCard(
    {character, onShowDetails, index, backgroundColor}:
    {character: CharacterType, onShowDetails: (url: string) => void, index: number, backgroundColor: string}
) {
    return (
        <AnimationWrapper index={index+1}>
            <section
            onClick={() => onShowDetails(character.url)}
            className="min-w-[150px] flex flex-col items-center gap-4 bg-white rounded-lg cursor-pointer"
            style={{backgroundColor}}
            >
                <Image 
                src={`https://picsum.photos/200/200`} 
                alt="character image"
                width={200}
                height={200}
                priority
                className="w-full hue-rotate-50 rounded-lr-lg"
                />
                <p className="mb-3 text-white text-md lg:text-lg font-bold">{character.name}</p>
            </section>
        </AnimationWrapper>
    )
}