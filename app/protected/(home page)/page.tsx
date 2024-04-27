import HomeMovieList from "@/components/HomeMovieList";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return console.log("User not found");
  }
  const { data: generalUsers, error } = await supabase
    .from("generalUsers")
    .select("user_name");
  if (error) {
    console.log(error);
  }
  if (!generalUsers) {
    return <div>Issue Loading UserName, Check Development</div>;
  }
  const { user_name }: { user_name: string } = generalUsers[0];
  const res1 = await getMoviesNowShowing();
  const {
    data: { films: moviesNowShowing },
  }: { data: { films: MovieGluFilm[] } } = await res1.json();

  const res2 = await getMoviesComingUp();
  const {
    data: { films: moviesComingUp },
  }: { data: { films: MovieGluFilm[] } } = await res2.json();
  console.log(moviesComingUp);
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^

  return (
    <section className="home-page-container">
      <div className="home-page-content">
        <div className="home-page-header">
          <span className="hp-header-mobile">{`Welcome Back ${user_name}!`}</span>
          <span className="hp-header-large">
            <span>{`Welcome Back Showtimer!`}</span>
            <span>{`Logged In To: ${user_name}`}</span>
          </span>
        </div>

        <div className="home-page-body">
          <div className="home-page-movie-list-container">
            <HomeMovieList title="Now Showing" movies={moviesNowShowing} />
          </div>
         
          <div className="home-page-movie-list-container">
            <HomeMovieList title="Coming Soon" movies={moviesComingUp} />
          </div>
            
          <div className="home-page-movie-list-container">
            <HomeMovieList title="Recommendations" movies={[]} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
