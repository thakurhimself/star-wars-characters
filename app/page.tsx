import HomeRootComponent from "@/components/HomeRootComponent";
import Link from "next/link";

export default async function Home(
  { searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}
) {

  const queryParams = await searchParams;
  const pageNum = queryParams?.page ? queryParams.page : 1;

  let characters;
  const totalCharCount = 82;
  const charPerCall = 10;

  try {
    // api call
    const response = await fetch(`https://swapi.dev/api/people/?page=${pageNum}`);

    if (!response.ok) {
      throw Error("Something went wrong");
    }

    characters = await response.json();
  } catch (error) {
    throw error
  }

  const pagination = Array.from({length: Math.ceil(totalCharCount/charPerCall)}, (_, elem) => elem + 1)
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-black py-10">
      <header className="w-full lg:w-4/5 xl:w-3/4 mx-auto p-3 lg:p-0">
        <p className="text-2xl font-[900] text-white pb-5">Star Wars</p>
      </header>
      <main className="w-full lg:w-4/5 xl:w-3/4 mx-auto p-3 lg:p-0">
      <HomeRootComponent characters={characters.results}/>
      {/* pagination */}
      <section className="flex gap-4">
        {
          pagination.map((pageNumber) => {
            return (
              <Link href={`/?page=${pageNumber}`} key={pageNumber}
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
