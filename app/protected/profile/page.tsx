import { createClient } from "@/utils/supabase/server";
import { UserPreferences } from "@/utils/constants";


export default async function ProfilePage () {

  //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
  const supabase = createClient();
	const {data: { user }} = await supabase.auth.getUser();
	if (!user) { return console.log("User not found")}
  const { data: preferences, error:err1 } = await supabase.from('preferences').select('*')
  if (err1) {console.log(err1)}
  if(!preferences) {return <div>Issue Loading Preferences, Check Development</div>}
  const userPreferences: UserPreferences = preferences[0];
  const { data: generalUsers, error } = await supabase.from('generalUsers').select('user_name, phone_number');
  if (error) {console.log(error)}
  if(!generalUsers) {return <div>Issue Loading UserName & Number, Check Development</div>}
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^


  const {user_name, phone_number}:{user_name:string, phone_number:string} = generalUsers[0];
  const {fav_actors, fav_directors, fav_genres, fav_companies} = userPreferences;

  return (
    <section className="profile-page-container">
			{/**
			 * 
			 * The data sets you need are already set up.
       * They are: user_name, fav_actors, fav_directors, fav_genres, fav_companies
       * These are all string arrays
       * 
       * The user information you need is the user_name and the user email
       * Examples of how to render these in the html are show below
       * 
			 * All of your "HTML" goes within this profile-page-container section
			 * The class name profile-page-container is already set up for you in the globals.css file
			 * Add the rest of your classes under it
			 * 
			 */}

			<div className="border-solid border-white border-2">This is the Profile Page</div>

      <div>{`This is the user name: ${user_name}`}</div>
      <div>{`This is the user name: ${phone_number}`}</div>
      <div>{`This is the user email: ${user.email}`}</div>

      <div>This is how to render the arrays:</div>

      <div className="flex justify-start items-center w-full h-fit overflow-x-auto border-solid border-white border-2">
        {fav_actors.map((actor) => <div key={actor}>{actor}, </div>)}
      </div>

      <div>These are the rest of the arrays:</div>
      <div className="flex justify-start items-center w-full h-fit overflow-x-auto border-solid border-white border-2">
        {fav_directors.map((director) => <div key={director}>{director}, </div>)}
      </div>
      <div className="flex justify-start items-center w-full h-fit overflow-x-auto border-solid border-white border-2">
        {fav_genres.map((genre) => <div key={genre}>{genre}, </div>)}
      </div>
      <div className="flex justify-start items-center w-full h-fit overflow-x-auto border-solid border-white border-2">
        {fav_companies.map((company) => <div key={company}>{company}, </div>)}
      </div>
		</section>
  )
}