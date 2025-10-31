import { CharacterType } from "@/types/types";


export default function CharacterDetails({character}: {character: CharacterType}) {
    console.log("character", character)
    const dateAdded = new Date(character.created);
    return (
        <section>
            <h1 className="text-2xl font-[900]">{character.name}</h1>
            <section 
            className="flex items-center justify-between"
            >
                <p>Height</p>
                <p>{Number(character.height)/100}</p>
            </section>

            <section 
            className="flex items-center justify-between"
            >
                <p>Mass</p>
                <p>{character.mass}</p>
            </section>

            <section 
            className="flex items-center justify-between"
            >
                <p>Date Added</p>
                <p>{dateAdded.getDate()}-{dateAdded.getMonth()}-{dateAdded.getFullYear()}</p>
            </section>

            <section 
            className="flex items-center justify-between"
            >
                <p>Number of films the person appears in</p>
                <p>{character.films.length}</p>
            </section>
            
            <section 
            className="flex items-center justify-between"
            >
                <p>Birth Year</p>
                <p>{character.birth_year}</p>
            </section>

            <section 
            className="flex items-center justify-between"
            >
                <p>Home World Details</p>
                <p>{character.homeworld}</p>
            </section>
        </section>
    )
}