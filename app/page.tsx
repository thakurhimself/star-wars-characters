import HomeRootComponent from "@/components/HomeRootComponent";
import { CharacterType } from "@/types/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home(
  { searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}
) {

  // check token
  const token = (await cookies()).get('token');
  if (token) {
    redirect('/dashboard')
  }

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
  let filmFilterList
  let homeworldFilterList;
  try {
    // fetch paginated characters
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNum}`);
    if (!response.ok) {
      throw Error("Something went wrong");
    }

    characters = await response.json();

    // distinct background colors for characters based on species
    characters.results.forEach((char: CharacterType) => {
      if (char.species.length > 0 && !cardBackgroundColors.hasOwnProperty(char.species[0])) {
        cardBackgroundColors[char.species[0]] = speciesColorPool.shift() || '#666666';
      }
    })
    cardBackgroundColors['unknown'] = '#ff7f50'

    // films
    const filmsResponse = await fetch('https://swapi.dev/api/films')
    if (!filmsResponse.ok) {
      throw Error("Something went wrong");
    }
    const films = await filmsResponse.json();
    filmFilterList = films.results.map((item: Record<string, string>) => {
      return {title: item.title, url: item.url}
    })

    // Home worlds
    const homeworldURLs: string[] = [];
    characters.results.forEach((item: CharacterType) => {
      if (homeworldURLs.indexOf(item.homeworld) < 0) {
        homeworldURLs.push(item.homeworld);
      }
    })
    const homeworldPromises = homeworldURLs.map((url) => {
      return fetch(url).then(async(result) => await result.json()).catch(() => {
        throw Error("Internal error occurred")
      });
    })

    const results = await Promise.allSettled(homeworldPromises)

    homeworldFilterList = results.map((item) => {
      if (item.status === 'fulfilled') {
        return{
                name: item.value.name,
                url: item.value.url
              }
      }
      return undefined
    }).filter((item) => item != undefined)

  } catch (error) {
    throw error
  }

  const pagination = Array.from({length: Math.ceil(totalCharCount/charPerCall)}, (_, elem) => elem + 1)
  const commonStyle = 'w-full lg:w-4/5 xl:w-3/4 mx-auto p-3'
  return (
    <div 
    className={commonStyle}
    >
      <header 
      className="p-3 lg:py-3 lg:px-0 flex items-center justify-between"
      >
        <p className="text-2xl lg:text-3xl font-[900] text-black dark:text-white">Star Wars</p>
        <Link href={'/login'} className="font-semibold hover:text-gray-500">Login</Link>
      </header>
      <main 
      >
        <HomeRootComponent 
        characters={characters.results} cardBackgroundColors={cardBackgroundColors}
        filmFilterList={filmFilterList}
        homeworldFilterList={homeworldFilterList}
        />
        
        {/* pagination */}
        <section className="mt-10 flex gap-4">
          {
            pagination.map((pageNumber) => {
              return (
                <Link href={`/${pageNumber === 1 ? '' : '?page='+pageNumber}`} key={pageNumber}
                className={`border-lg border p-2 ${Number(pageNum) === pageNumber ? 'bg-blue-200 dark:text-black' : ''}`}
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
