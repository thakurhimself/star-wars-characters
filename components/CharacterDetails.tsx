import { CharacterType } from "@/types/types";


export default function CharacterDetails(
    {character, homeWorldDetails}: 
    {character: CharacterType, homeWorldDetails: Record<string, string | string[]>}
) {
    const dateAdded = new Date(character.created);

    const infoFieldStyleClasses = 'mb-2 p-2 bg-slate-200 rounded-md flex items-center justify-between'
    const infoStyleClasses = 'text-black'
    return (
        <section>
            <h1 className="text-2xl font-[900] mb-3 text-center dark:text-black">{character.name}</h1>
            <section 
            className={infoFieldStyleClasses}
            >
                <p className={infoStyleClasses}>Height (meter)</p>
                <p className={infoStyleClasses}>{Number(character.height)/100}</p>
            </section>

            <section 
            className={infoFieldStyleClasses}
            >
                <p className={infoStyleClasses}>Mass (Kg)</p>
                <p className={infoStyleClasses}>{character.mass}</p>
            </section>

            <section 
            className={infoFieldStyleClasses}
            >
                <p className={infoStyleClasses}>Date Added</p>
                <p className={infoStyleClasses}>{dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}</p>
            </section>

            <section 
            className={infoFieldStyleClasses}            
            >
                <p className={infoStyleClasses}>Number of films the person appears in</p>
                <p className={infoStyleClasses}>{character.films.length}</p>
            </section>
            
            <section 
            className={infoFieldStyleClasses}            
            >
                <p className={infoStyleClasses}>Birth Year</p>
                <p className={infoStyleClasses}>{character.birth_year}</p>
            </section>

            <section 
            className="mt-5 flex flex-col"
            >
                <p className="text-lg lg:text-xl dark:text-black font-semibold mb-1">Home World Details</p>
                <section 
                className={infoFieldStyleClasses}            
                >
                    <p className={infoStyleClasses}>Name</p>
                    <p className={infoStyleClasses}>{homeWorldDetails.name}</p>
                </section>
                <section 
                className={infoFieldStyleClasses}            
                >
                    <p className={infoStyleClasses}>Terrain</p>
                    <p className={infoStyleClasses+' capitalize'}>{homeWorldDetails.terrain}</p>
                </section>
                <section 
                className={infoFieldStyleClasses}            
                >
                    <p className={infoStyleClasses}>Climate</p>
                    <p className={infoStyleClasses+' capitalize'}>{homeWorldDetails.climate}</p>
                </section>
                <section 
                className={infoFieldStyleClasses}            
                >
                    <p className={infoStyleClasses}>Population</p>
                    <p className={infoStyleClasses}>{homeWorldDetails.population}</p>
                </section>
            </section>
        </section>
    )
}