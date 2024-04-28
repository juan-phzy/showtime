import { filterArrays } from "@/utils/utilityFuncs";

export async function GET() {

	const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
	const CLIENT = process.env.MOVIEGULU_CLIENT;
	const API_KEY = process.env.MOVIEGULU_API_KEY;
	const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
	const TERRITORY = process.env.MOVIEGULU_TERRITORY;
	const API_VERSION = process.env.MOVIEGULU_API_VERSION;
	const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;

	const res = await fetch(`${API_URL}/filmsNowShowing/?n=10`, {
		headers: {
			"client": CLIENT ?? "",
			"x-api-key": API_KEY ?? "",
			"authorization": AUTH ?? "",
			"territory": TERRITORY ?? "",
			"api-version": API_VERSION ?? "",
			"geolocation": GEOLOC ?? "",
			"device-datetime": new Date().toISOString(),
		},
	});
	const data = await res.json();
	const films = data.films.map((film:any) => {
			return [film.film_id, film.imdb_title_id];
	})

	const filmDetailList = await Promise.all(films.map(async (film:any) => {
		const filmDetailRes = await fetch(`${API_URL}/filmDetails/?film_id=${film[0]}`, {
			headers: {
				"client": CLIENT ?? "",
				"x-api-key": API_KEY ?? "",
				"authorization": AUTH ?? "",
				"territory": TERRITORY ?? "",
				"api-version": API_VERSION ?? "",
				"geolocation": GEOLOC ?? "",
				"device-datetime": new Date().toISOString(),
			},
		});
		const filmDetail = await filmDetailRes.json();
		return {
				film_id: parseInt(filmDetail.film_id),
				distributor: filmDetail.distributor,
				actors: filmDetail.cast.map((actor:any) => [actor.cast_name, [parseInt(filmDetail.film_id)]]),
				directors: filmDetail.directors.map((director:any) => [director.director_name, [parseInt(filmDetail.film_id)]]),
		};
	}));

	//console.log("\n\nFilm Detail List: ",filmDetailList[0],"\n\n")

	const dis:[string | null,number[]][] = filmDetailList.map((film:any) => {return [film.distributor, [parseInt(film.film_id)]]});
	const uniqueDis = filterArrays(dis);
	//console.log("\n\nUnique Distributors: ",uniqueDis,"\n\n");

	const arrayOfActorArrays = filmDetailList.map((film:any) => {return film.actors});
	const flattenedActorArray:[string | null,number[]][] = arrayOfActorArrays.flat();	
	const uniqueActors = filterArrays(flattenedActorArray);
	//console.log("\n\nUnique Actors: ",uniqueActors,"\n\n");

	const arrayOfDirectorArrays = filmDetailList.map((film:any) => {return film.directors});
	const flattenedDirectorArray:[string | null,number[]][] = arrayOfDirectorArrays.flat();	
	const uniqueDirectors = filterArrays(flattenedDirectorArray);
	//console.log("\n\nUnique Directors: ",uniqueDirectors,"\n\n");

	const lists = {
		actors: uniqueActors,
		directors: uniqueDirectors,
		distributors: uniqueDis,
	}

	return Response.json({lists});
}
  