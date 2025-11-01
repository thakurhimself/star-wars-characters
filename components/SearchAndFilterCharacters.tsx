import { HomeworldType } from "@/types/types"
import { ChangeEvent } from "react"

export default function SearchAndFilterCharacters(
    {
        filter, 
        filmFilterList,
        homeworldFilterList,
        onFilterChange
    }:
    { 
        filter: {name: string, homeworld: string, film: string, species: string}, 
        filmFilterList: Array<Record<string, string>>,
        homeworldFilterList: HomeworldType[],
        onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    }
) {
    return (
        <section className="pb-3 flex flex-col lg:flex-row justify-around gap-4">
            <input 
            name="name" 
            value={filter.name} 
            placeholder="Enter character name" 
            className="w-full p-3 border rounded-lg"
            onChange={onFilterChange}
            />

            {/* Homeworld filter */}
            <select 
            name="homeworld"
            value={filter.homeworld}
            className="w-full p-3 border rounded-lg"
            onChange={onFilterChange}
            >
                <option value={''}>Select Homeworld</option>
                {
                    homeworldFilterList.map((item) => {
                        return (
                            <option key={item.url} value={item.url}>
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>

            {/*  */}
            <select 
            name="film"
            value={filter.film}
            className="w-full p-3 border rounded-lg"
            onChange={onFilterChange}
            >
                <option value={''}>Select Film</option>
                {
                    filmFilterList.map((item) => {
                        return (
                            <option key={item.url} value={item.url}>
                                {item.title}
                            </option>
                        )
                    })
                }
            </select>

            <select 
            name="species"
            value={filter.species}
            className="w-full border rounded-lg p-3"
            onChange={onFilterChange}
            >
                <option value={''}>Select Species</option>
                <option>Droid</option>
            </select>
        </section>
    )
}