'use client';

import { CharacterType } from "@/types/types"
import CharacterCard from "./CharacterCard"
import { useState } from "react"
import Portal from "./Portal";
import { AnimatePresence } from "motion/react";
import CharacterDetails from "./CharacterDetails";


export default function HomeRootComponent(
    {characters}: {characters: CharacterType[]}
) {
    const [charURL, setCharURL] = useState<string>('');

    const characterDetailsHandler = (url: string) => {
        setCharURL(url);
    }

    const character = characters.filter(item => item.url === charURL)[0];

    return (
        <section>
            <AnimatePresence>
                {
                    (charURL.length > 0 && character) &&
                    <Portal onClosePortal={() => setCharURL('')}>
                        <CharacterDetails character={character} />
                    </Portal>
                }
            </AnimatePresence>
         
            <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                {
                    characters.map((char: CharacterType, index: number) => {
                        return (
                            <CharacterCard 
                            key={char.url} 
                            character={char} 
                            index={index}
                            onShowDetails={characterDetailsHandler}
                            />
                        )
                    })
                }
            </section>
        </section>
    )
}