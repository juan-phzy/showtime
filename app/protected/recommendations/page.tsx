import { MovieSource } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import {
  filterShowtimes,
  finalMerge,
  getDate,
  mergeFilmObjects,
  processData,
} from "@/utils/utilityFuncs";
import Image from "next/image";
import AllTimes from "./components/AllTimes";

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
    return <div>Issue Loading Preferences, Check Development</div>;
  }

  const { data: theaterID, error: err2 } = await supabase
    .from("generalUsers")
    .select("favoriteTheater");
  if (err2) {
    console.log(err2);
  }
  if (!theaterID) {
    return <div>Issue Loading Theater, Check Development</div>;
  }

  const recommendedMovieIds = JSON.parse(preferences[0].recommendedMovies);
  const favTheater = theaterID[0].favoriteTheater;
  console.log(
    "Recommended Movie IDs--------------------------------- \n",
    recommendedMovieIds
  );

  const finalData = await processData(recommendedMovieIds, favTheater);
  console.log("Final Data: ", finalData);
  console.log(finalData.length);

  return (
    <section className="recs-page-container">
      <div className="recs-page-content">
        <div className="recs-page-header">Recommended Showtimes at {finalData[0][0].cinema_name}</div>
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
              
                <div className="w-full h-fit flex flex-col justify-center items-center"> 
                  
                  {
                    movietimes.map((movie, j)=>{
                    const date = getDate(j+1).slice(5,10);
                    const allTimes = movie.showings.Standard.times;
                    const recTimes = filterShowtimes(movie.showings.Standard.times, 'evening');
                    return (
                      <div className="w-full h-fit flex flex-col justify-center items-center" key={movie.imdb_id+j}>
                        <span className="w-full h-fit border-solid border-amber-400 border-b-2 flex justify-between items-center text-lg font-medium p-2"><span>Standard Showings</span> {`${date.replace('-','/')}`}</span>
                        <div className="rec-list p-2">
                        {`Recommended Times: `}{recTimes.map((time)=>{return <div className="rec-list-item text-xs">{time.start_time}</div>})}
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
