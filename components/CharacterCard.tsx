'use client';

import Image from "next/image"
import { motion } from "motion/react";
import { CharacterType } from "@/types/types";

export default function CharacterCard(
    {character, onShowDetails, index}:
    {character: CharacterType, onShowDetails: (url: string) => void, index: number}
) {
    return (
        <motion.div 
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.2*(index+1)}}
        >
            <section
            onClick={() => onShowDetails(character.url)}
            className="min-w-[150px] flex flex-col items-center gap-4 bg-white rounded-lg cursor-pointer"
            >

            <Image src={`https://picsum.photos/200/200`} 
            alt="character image"
            width={200}
            height={200}
            priority
            className="w-full hue-rotate-50 rounded-lg"
            />
            <p className="mb-3 text-sm md:text-md lg:text-lg font-bold">{character.name}</p>
            </section>

        </motion.div>
    )
}