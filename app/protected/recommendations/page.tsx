import { MovieSource } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { finalMerge, getDate, mergeFilmObjects, processData } from "@/utils/utilityFuncs";



export default async function RecommendationsPage() {

  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  if (!user) {return console.log("User not found");}
  const { data: preferences, error: err1 } = await supabase.from("preferences").select("recommendedMovies");
  if (err1) {console.log(err1);}
  if (!preferences) {
    return <div>Issue Loading Preferences, Check Development</div>;
  }

  const { data: theaterID, error: err2 } = await supabase.from("generalUsers").select("favoriteTheater");
  if (err2) {console.log(err2);}
  if (!theaterID) {
    return <div>Issue Loading Theater, Check Development</div>;
  }
  
  const recommendedMovieIds = JSON.parse(preferences[0].recommendedMovies);
  const favTheater = theaterID[0].favoriteTheater;
  console.log("Recommended Movie IDs--------------------------------- \n", recommendedMovieIds);

  const finalData = await processData(recommendedMovieIds, favTheater);
  console.log("Final Data: ", finalData);
  console.log(finalData.length)

  return (
    <section className="recs-page-container">
      <div className="recs-page-content">
        <div className="recs-page-header">Recommended</div>
        <div className="recs-page-body">
          Blah
        </div>
      </div>
    </section>
  )
}

