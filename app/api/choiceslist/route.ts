import { removeDuplicatesUsingFilter } from "@/utils/utilityFuncs";

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
			"client":CLIENT ? CLIENT : "",
			"x-api-key":API_KEY ? API_KEY : "",
			"authorization":AUTH ? AUTH : "",
			"territory":TERRITORY ? TERRITORY : "",
			"api-version":API_VERSION ? API_VERSION : "",
			"geolocation":GEOLOC ? GEOLOC : "",
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
						"client": CLIENT ? CLIENT : "",
						"x-api-key": API_KEY ? API_KEY : "",
						"authorization": AUTH ? AUTH : "",
						"territory": TERRITORY ? TERRITORY : "",
						"api-version": API_VERSION ? API_VERSION : "",
						"geolocation": GEOLOC ? GEOLOC : "",
						"device-datetime": new Date().toISOString(),
				},
		});
		const filmDetail = await filmDetailRes.json();
		return {
				distributor: filmDetail.distributor,
				actors: filmDetail.cast.map((actor:any) => actor.cast_name),
				directors: filmDetail.directors.map((director:any) => director.director_name),
		};
	}));

	//console.log("\n\nFilm Detail List: ",filmDetailList,"\n\n")

	const dis:string[] = filmDetailList.map((film:any) => {return film.distributor});
	const uniqueDis = removeDuplicatesUsingFilter(dis);

	const arrayOfActorArrays:string[] = filmDetailList.map((film:any) => {return film.actors});
	const flattenedActorArray = arrayOfActorArrays.flat();
	const uniqueActors = removeDuplicatesUsingFilter(flattenedActorArray);

	const arrayOfDirectorArrays:string[] = filmDetailList.map((film:any) => {return film.directors});
	const flattenedDirectorArray = arrayOfDirectorArrays.flat();
	const uniqueDirectors = removeDuplicatesUsingFilter(flattenedDirectorArray);

	const lists = {
		actors: uniqueActors,
		directors: uniqueDirectors,
		distributors: uniqueDis,
	}

	return Response.json({lists});
}
  