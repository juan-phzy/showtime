import { createClient } from "@/utils/supabase/server";
import { MovieTheater, UserPreferences } from "@/utils/constants";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";


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


export default async function ProfilePage() {
  //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return console.log("User not found");
  }
  const { data: preferences, error: err1 } = await supabase.from("preferences").select("*");
  if (err1) {console.log(err1);}
  if (!preferences) {
    return <div>Issue Loading Preferences, Check Development</div>;
  }
  const userPreferences: UserPreferences = preferences[0];
  const { data: generalUsers, error } = await supabase.from("generalUsers").select("user_name, phone_number,favoriteTheater");
  if (error) {
    console.log(error);
  }
  if (!generalUsers) {
    return <div>Issue Loading UserName & Number, Check Development</div>;
  }

  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^

  const {
    user_name,
    phone_number,
    favoriteTheater,
  }: { user_name: string; phone_number: string; favoriteTheater: string } =
    generalUsers[0];
  const { fav_actors, fav_directors, fav_genres, fav_companies } =
    userPreferences;
  const formattedPhoneNumber = phone_number.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "($1) $2-$3"
  );

  const res = await getTheaterData(favoriteTheater);
	const { data:theaterData }:{ data:MovieTheater } = await res.json();

  return (
    <section className="profile-page-container">
      <div className="profile-page-content">

        <div className="profile-page-section">

          <div className="profile-title justify-between">
            <div className="w-fit h-full flex justify-center items-center">User Information</div>
            <Link href={"/protected/complete-sign-up?step=1"} className="w-fit h-full flex justify-center items-center gap-2 text-base">Edit<FaEdit size={20}/></Link>
          </div>
          <div className="profile-section-content">
            <div>Username: {user_name}</div>
            <div>Phone: {formattedPhoneNumber}</div>
            <div>Email: {user.email}</div>
          </div>

        </div>

        <div className="profile-page-section">

          <div className="profile-title">
            <div>Favorite Theater</div>
          </div>
          <div className="profile-section-content">
            <div>Cinema Name: {theaterData.cinema_name}</div>
            <div>Address: {`${theaterData.address}, ${theaterData.city}`}</div>
            <div>Phone: {theaterData.phone}</div>
          </div>

        </div>

        <div className="profile-page-section">

          <div className="profile-title">
            <div>Preferences</div>
          </div>
          <div className="profile-section-content">
            <div className="profile-subtitle">Favorite Actors</div>
            <div className="profile-list">
              {fav_actors.map((actor) => (
                <div key={actor} className="profile-list-item">{actor}</div>
              ))}
            </div>

            <div className="profile-subtitle">Favorite Directors</div>
            <div className="profile-list">
              {fav_directors.map((director) => (
                <div key={director} className="profile-list-item">{director}</div>
              ))}
            </div>

            <div className="profile-subtitle">Favorite Genres</div>
            <div className="profile-list">
              {fav_genres.map((genre) => (
                <div key={genre} className="profile-list-item">{genre}</div>
              ))}
            </div>

            <div className="profile-subtitle">Favorite Companies</div>
            <div className="profile-list">
              {fav_companies.map((company) => (
                <div key={company} className="profile-list-item">{company}</div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
