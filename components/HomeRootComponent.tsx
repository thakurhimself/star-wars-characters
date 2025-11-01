'use client';

import { CharacterType, UIStateType } from "@/types/types"
import CharacterCard from "./CharacterCard"
import { useState } from "react"
import Portal from "./Portal";
import CharacterDetails from "./CharacterDetails";

export default function HomeRootComponent(
    {
        characters, 
        cardBackgroundColors
    }: 
    {
        characters: CharacterType[],
        cardBackgroundColors: Record<string, string>
    }
) {
    // Used to identify character since ID is not provided in the API
    const [charURL, setCharURL] = useState<string>(''); 
    // UI states
    const [uiState, setUIState] = useState<UIStateType>({type: null})
    // home world details
    const [homeWorldDetails, setHomeWorldDetails] = useState<Record<string, string | string[]>>({})

    const characterDetailsHandler = async(url: string) => {
        setCharURL(url);
        const homeWorldURL = characters.filter(item => item.url === url)[0].homeworld

        // fetching the home world details
        setUIState({type: 'loading'});
        const response = await fetch(homeWorldURL);
        if (!response.ok) {
            setUIState({type: 'error', message: 'Internal error occurred'})
        }
        const homeWorld = await response.json();
        setUIState({type: null})
        setHomeWorldDetails(homeWorld)
    }

    const character = characters.filter(item => item.url === charURL)[0];
    const baseUIStyleClass = 'w-fit mx-auto text-white p-3 font-bold rounded-md'

    return (
        <section>
            {
                (charURL.length > 0 && character) &&
                <Portal onClosePortal={() => setCharURL('')}>
                    {
                        uiState.type === 'loading' ?
                        <p className={baseUIStyleClass+' bg-green-900'}
                        >
                            Loading...
                        </p>:
                        uiState.type === 'error'?
                        <p
                        className={baseUIStyleClass+' bg-red-400'}
                        >
                            {uiState.message}
                        </p>:
                        <CharacterDetails 
                        character={character} 
                        homeWorldDetails={homeWorldDetails}
                        />
                    }
                </Portal>
            }
            
         
            <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                {
                    characters.map((char: CharacterType, index: number) => {
                        const backgroundColor = char.species.length > 0 ? cardBackgroundColors[char.species[0]] : cardBackgroundColors['unknown']
                        return (
                            <CharacterCard 
                            key={char.url} 
                            character={char} 
                            index={index}
                            onShowDetails={characterDetailsHandler}
                            backgroundColor={backgroundColor}
                            />
                        )
                    })
                }
            </section>
        </section>
    )
}