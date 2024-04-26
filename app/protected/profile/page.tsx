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
        <h1>{user_name}</h1>
        <p>{formattedPhoneNumber}</p>
        <p>{user.email}</p>
      </div>
      <div className="preferences">
        <h1>Preferences</h1>
        <div className="favorite-item">
          <h2>Favorite Directors</h2>
          {fav_directors.map((director, index) => (
            <div key={index} className="item">
              <img src={director} alt={director} className="item-image"/>
              <span className="item-text">{director}</span>
            </div>
          ))}
        </div>
        <div className="favorite-item">
          <h2>Favorite Actors</h2>
          {fav_actors.map((actor, index) => (
            <div key={index} className="item">
              <img src={actor} alt={actor} className="item-image"/>
              <span className="item-text">{actor}</span>
            </div>
          ))}
        </div>
        <div className="favorite-item">
          <h2>Favorite Genres</h2>
          {fav_genres.map((genre, index) => (
            <div key={index} className="item">
              <img src={genre} alt={genre} className="item-image"/>
              <span className="item-text">{genre}</span>
            </div>
          ))}
        </div>
        <div className="favorite-item">
          <h2>Favorite Companies</h2>
          {fav_companies.map((company, index) => (
            <div key={index} className="item">
              <img src={company} alt={company} className="item-image"/>
              <span className="item-text">{company}</span>
            </div>
          ))}
        </div>
      </div>
      <nav className="navigation">
        {/* Navigation items */}
      </nav>
    </section>
  );
}