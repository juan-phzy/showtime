import { MovieSource, MovieTheater } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import {
  filterShowtimes,
  getDate,
  processData,
} from "@/utils/utilityFuncs";
import Image from "next/image";
import AllTimes from "./components/AllTimes";


//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
const CLIENT = process.env.MOVIEGULU_CLIENT;
const API_KEY = process.env.MOVIEGULU_API_KEY;
const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
const TERRITORY = process.env.MOVIEGULU_TERRITORY;
const API_VERSION = process.env.MOVIEGULU_API_VERSION;
const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;
async function getTheaterData(theaterID: string) {
  const res = await fetch(`${API_URL}/cinemaDetails/?cinema_id=${theaterID}`, {
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


export default async function RecommendationsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return console.log("User not found");
  }
  const { data: preferences, error: err1 } = await supabase
    .from("preferences")
    .select("recommendedMovies");
  if (err1) {
    console.log(err1);
  }
  if (!preferences) {
    return <div>Issue Loading Recommended Movies, Check Development</div>;
  }

  const { data: theaterID, error: err2 } = await supabase
    .from("generalUsers")
    .select("favoriteTheater, showtime_preference");
  if (err2) {
    console.log(err2);
  }
  if (!theaterID) {
    return <div>Issue Loading Theater & showtime_preference, Check Development</div>;
  }

  

  const recommendedMovieIds = JSON.parse(preferences[0].recommendedMovies);
  const favTheater = theaterID[0].favoriteTheater;
  const showtimePref = theaterID[0].showtime_preference;
  
  const res = await getTheaterData(favTheater);
	const { data:theaterData }:{ data:MovieTheater } = await res.json();

  const finalData = await processData(recommendedMovieIds, favTheater);

  return (
    <section className="recs-page-container">
      <div className="recs-page-content">
        <div className="recs-page-header">Recommended Showtimes at {theaterData.cinema_name}</div>
        <div className="recs-page-body scroll-y-only">
          {finalData.map((movietimes, i) => {
            if (movietimes.length === 0) {
              return null;
            }
            return (
              
              <div key={i} className="recs-page-section">
                <div className="recs-title">
                  <div className="recs-image">
                    <Image
                      className="object-cover"
                      src={movietimes[0].images.poster["1"].medium.film_image}
                      alt={movietimes[0].film_name}
                      fill
                    />
                  </div>
                  <div className="recs-title-text">
                    {movietimes[0].film_name}
                  </div>
                  
                </div>

                <div className="w-full h-fit border-solid border-white border-2 text-lg hidden">Standard Showings</div>
              
                <div className="w-full h-fit flex flex-col justify-center items-center gap-4"> 
                  
                  {
                    movietimes.map((movie, j)=>{
                    const date = getDate(j+1).slice(5,10);
                    const allTimes = movie.showings.Standard.times;
                    const recTimes = filterShowtimes(movie.showings.Standard.times, showtimePref);
                    return (
                      <div className="w-full h-fit flex flex-col justify-center items-center" key={movie.imdb_id+j}>
                        <span className="w-full h-fit border-solid border-amber-400/30 border-b-[1px] flex justify-between items-center text-lg font-medium p-2"><span>Standard Showings</span> {`${date.replace('-','/')}`}</span>
                        <div className="rec-list p-2 border-l-2 border-solid border-white">
                        {`Recommended Times: `}{recTimes.map((time)=>{return <div key={time.start_time} className="rec-list-item text-xs">{time.start_time}</div>})}
                        </div>
                        <AllTimes allTimes={allTimes}/>
                      </div>
                    )
                  })}

                </div>

              </div> 

          )})}
        </div>
      </div>
    </section>
  );
}
