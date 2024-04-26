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
  const formattedPhoneNumber = phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <section className="profile-page-container">
      <div className="user-info">
        <h1>Username</h1>
        <p>{user_name}</p>
        <p>{formattedPhoneNumber}</p>
        <p>{user.email}</p>
      </div>
      <div className="preferences">
        <h2>Preferences</h2>
        <div className="favorite-item">
          <h3>Favorite Directors</h3>
          {fav_directors.map((director, index) => (
            <div key={index} className="item">{director}</div>
          ))}
        </div>
        <div className="favorite-item">
          <h3>Favorite Actors</h3>
          {fav_actors.map((actor, index) => (
            <div key={index} className="item">{actor}</div>
          ))}
        </div>
        <div className="favorite-item">
          <h3>Favorite Genres</h3>
          {fav_genres.map((genre, index) => (
            <div key={index} className="item">{genre}</div>
          ))}
        </div>
        <div className="favorite-item">
          <h3>Favorite Companies</h3>
          {fav_companies.map((company, index) => (
            <div key={index} className="item">{company}</div>
          ))}
        </div>
      </div>
      <nav className="navigation">
        {/* Navigation items */}
      </nav>
    </section>
  );
}