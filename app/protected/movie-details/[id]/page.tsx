import MovieDetails from "@/components/MovieDetails";
import { getMovieGluDetail } from "@/utils/utilityFuncs";

async function getTMDBData(id: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            process.env.TMDB_AUTH ?? "",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    //console.log(error);
    return null;
  }
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  //console.log(params.id);
  const data = await getMovieGluDetail(params.id);

	let tmdbData = null;
	if (data) {
		tmdbData = await getTMDBData(data.imdb_title_id);
    console.log("TMDB: ", tmdbData);
    console.log(process.env.TMDB_AUTH);
	}

  return (
    <section className="movie-details-container scroll-y-only">
      <MovieDetails data={data} tmdbData={tmdbData} />
    </section>
  );
}
