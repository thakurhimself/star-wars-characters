'use client';

import { CharacterType, HomeworldType, UIStateType } from "@/types/types"
import CharacterCard from "./CharacterCard"
import { ChangeEvent, useEffect, useState } from "react"
import Portal from "./Portal";
import CharacterDetails from "./CharacterDetails";
import SearchAndFilterCharacters from "./SearchAndFilterCharacters";

export default function HomeRootComponent(
    {
        characters, 
        cardBackgroundColors,
        filmFilterList,
        homeworldFilterList
    }: 
    {
        characters: CharacterType[],
        cardBackgroundColors: Record<string, string>,
        filmFilterList: Array<Record<string, string>>,
        homeworldFilterList: HomeworldType[]
    }
) {
    // Used to identify character since ID is not provided in the API
    const [charURL, setCharURL] = useState<string>(''); 
    // UI states
    const [uiState, setUIState] = useState<UIStateType>({type: null})
    // home world details
    const [homeWorldDetails, setHomeWorldDetails] = useState<Record<string, string | string[]>>({})

    // Search and filter states
    const [filter, setFilter] = useState<{
        name: string, homeworld: string, 
        film: string, species: string
    }>(
        {
            name: '', homeworld: '', film: '', species: ''
        }
    )
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterType[]>([])

    // filter change handler
    function filterChangeHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const { name, value } = e.target;
        setFilter((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // character details show handler
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

    // debouncing search and filter
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasActiveFilters = filter.name.length > 0 || filter.homeworld.length > 0 || filter.film.length > 0 || filter.species.length > 0
            if(hasActiveFilters) {
                const filteredChar = characters.filter((item) => {
                    const matchesName = filter.name.length > 0 
                    ? item.name.toLowerCase().includes(filter.name.toLowerCase())
                    : true;

                    const matchesHomeworld = filter.homeworld.length > 0 ? item.homeworld === filter.homeworld : true;

                    const matchesFilms = filter.film.length > 0 ? item.films.indexOf(filter.film) > -1 : true;

                    return matchesName && matchesHomeworld && matchesFilms;
                })
                // console.log("filteredChar", filteredChar);
                
                setFilteredCharacters(filteredChar);
            }
            else {
                setFilteredCharacters([]);
            }
            
        }, 300)

        return () => {clearTimeout(timer)}
    }, [filter, characters])

    // character whose details have been chosen to be shown.
    const character = characters.filter(item => item.url === charURL)[0];

    // common styles classes
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
            
            <SearchAndFilterCharacters 
            filter={filter}
            filmFilterList={filmFilterList}
            homeworldFilterList={homeworldFilterList}
            onFilterChange={filterChangeHandler}
            />
         
            <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                {
                    filteredCharacters.length > 0 ?
                    filteredCharacters.map((char: CharacterType, index: number) => {
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
                    :
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