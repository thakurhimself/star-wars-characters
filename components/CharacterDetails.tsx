import { CharacterType } from "@/types/types";


export default function CharacterDetails(
    {character, homeWorldDetails}: 
    {character: CharacterType, homeWorldDetails: Record<string, string | string[]>}
) {
    const dateAdded = new Date(character.created);
    return (
        <section>
            <h1 className="text-2xl font-[900] mb-3 text-center">{character.name}</h1>
            <section 
            className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
            >
                <p>Height (meter)</p>
                <p>{Number(character.height)/100}</p>
            </section>

            <section 
            className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
            >
                <p>Mass (Kg)</p>
                <p>{character.mass}</p>
            </section>

            <section 
            className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
            >
                <p>Date Added</p>
                <p>{dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}</p>
            </section>

            <section 
            className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
            >
                <p>Number of films the person appears in</p>
                <p>{character.films.length}</p>
            </section>
            
            <section 
            className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
            >
                <p>Birth Year</p>
                <p>{character.birth_year}</p>
            </section>

            <section 
            className="mt-5 flex flex-col"
            >
                <p className="text-lg lg:text-xl font-semibold mb-1">Home World Details</p>
                <section 
                className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
                >
                    <p>Name</p>
                    <p>{homeWorldDetails.name}</p>
                </section>
                <section 
                className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
                >
                    <p>Terrain</p>
                    <p className="capitalize">{homeWorldDetails.terrain}</p>
                </section>
                <section 
                className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
                >
                    <p>Climate</p>
                    <p className="capitalize">{homeWorldDetails.climate}</p>
                </section>
                <section 
                className="mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between"
                >
                    <p>Population</p>
                    <p>{homeWorldDetails.population}</p>
                </section>
            </section>
        </section>
    )
}