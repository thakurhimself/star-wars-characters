import HomeRootComponent from "@/components/HomeRootComponent";
import { CharacterType } from "@/types/types";
import Link from "next/link";

export default async function Home(
  { searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}
) {

  const speciesColorPool = [
    "#2B2D42",
    "#CFB53B",
    "#8A0303",
    "#1E3A5F",
    "#C5A472",
    "#4A5D23",
    "#6D1E5F",
    "#AC8D63",
    "#0A3D5F",
    "#B22222"
  ];

  const cardBackgroundColors: Record<string, string> = {};

  const queryParams = await searchParams;
  const pageNum = queryParams?.page ? queryParams.page : 1;

  let characters;
  const totalCharCount = 82;
  const charPerCall = 10;

  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNum}`);
    if (!response.ok) {
      throw Error("Something went wrong");
    }

    characters = await response.json();

    characters.results.forEach((char: CharacterType) => {
      if (char.species.length > 0 && !cardBackgroundColors.hasOwnProperty(char.species[0])) {
        cardBackgroundColors[char.species[0]] = speciesColorPool.shift() || '#666666';
      }
    })

    cardBackgroundColors['unknown'] = '#ff7f50'

  } catch (error) {
    throw error
  }

  const pagination = Array.from({length: Math.ceil(totalCharCount/charPerCall)}, (_, elem) => elem + 1)

  return (
    <div 
    className="py-2"
    >
      <header 
      className="w-full lg:w-4/5 xl:w-3/4 mx-auto p-3 lg:py-3 lg:px-0"
      >
        <p className="text-2xl lg:text-3xl font-[900] text-black">Star Wars</p>
      </header>
      <main 
      className="w-full lg:w-4/5 xl:w-3/4 mx-auto p-3 lg:p-0"
      >
        <HomeRootComponent characters={characters.results} cardBackgroundColors={cardBackgroundColors}/>
        
        {/* pagination */}
        <section className="mt-10 flex gap-4">
          {
            pagination.map((pageNumber) => {
              return (
                <Link href={`/${pageNumber === 1 ? '' : '?page='+pageNumber}`} key={pageNumber}
                className={`border-lg border p-2 ${Number(pageNum) === pageNumber ? 'bg-blue-200' : ''}`}
                >
                  {pageNumber}
                </Link>
              )
            })
          }
        </section>
      </main>
    </div>
  );
}
