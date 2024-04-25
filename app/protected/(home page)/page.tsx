import { MovieGluFilm } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";


//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
const CLIENT = process.env.MOVIEGULU_CLIENT;
const API_KEY = process.env.MOVIEGULU_API_KEY;
const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
const TERRITORY = process.env.MOVIEGULU_TERRITORY;
const API_VERSION = process.env.MOVIEGULU_API_VERSION;
const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;
async function getMoviesNowShowing() {
  const res = await fetch(`${API_URL}/filmsNowShowing/?n=5`, {
		method: "GET",
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
  return Response.json({data});
}
async function getMoviesComingUp() {
  const res = await fetch(`${API_URL}/filmsComingSoon/?n=5`, {
		method: "GET",
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
  return Response.json({data});
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^



export default async function HomePage() {

	//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
	if (!user) { return console.log("User not found")}
  const { data: generalUsers, error } = await supabase.from('generalUsers').select('user_name');
  if (error) {console.log(error)}
  if(!generalUsers) {return <div>Issue Loading UserName, Check Development</div>}
  const {user_name}:{user_name:string} = generalUsers[0];
	const res1 = await getMoviesNowShowing();
	const { data: { films:moviesNowShowing } } : { data: { films:MovieGluFilm[]}} = await res1.json();

	const res2 = await getMoviesComingUp();
	const { data: { films:moviesComingUp } } : { data: { films:MovieGluFilm[]}} = await res2.json();
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^
	
	return (
		<section className="home-page-container">
			{/**
			 * 
			 * The two data sets you need are: moviesNowShowing and moviesComingUp
			 * 
			 * They are arrays of MovieGluFilm objects and they are already set up in this file
			 * You can view the MovieGluFilm interface in the utils/constants.ts file
			 * There is also an example of a MovieGluFilm object in the utils/constants.ts file
			 * 
			 * All of your "HTML" goes within this home-page-container section
			 * The class name home-page-container is already set up for you in the globals.css file
			 * Add the rest of your classes under it
			 * 
			 */}

			<div>This is the Home Page</div>
      <div>{`This is the user name: ${user_name}`}</div>
      <div>This is how to render the arrays:</div>
      <div className="flex justify-start items-center w-full h-fit overflow-x-auto border-solid border-white border-2">
        {
          moviesNowShowing.map(
            (movie) => {
              return <div key={movie.film_id}>| {movie.film_name} |</div>
            }
        )
        }
      </div>
		</section>
	);
}
