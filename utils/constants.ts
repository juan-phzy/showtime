import { fromJSON } from "postcss";
import { FaUserAlt, FaBell, FaFilm, FaHome  } from "react-icons/fa";



export type FormSubmitFunction = (formData: FormData) => Promise<void>;

export interface SignUpSearchParams {
  error: string;
  message: string;
  step: string;
}
  
export interface CinemaChoiceData {
  cinemas: CinemaData[];
  status: {
    count: string;
    device_datetime_sent: string;
    device_datetime_used: string;
    message: string | null;
    method: string;
    request_method: string;
    state: string;
    territory: string;
    version: string;
  }
}

export interface CinemaData {
  address: string;
  address2: string;
  cinema_id: string;
  cinema_name: string;
  city: string;
  county: string;
  distance: string;
  lat: string;
  lng: string;  
  logo_url: string;
  postcode: string;
  state: string;
}

export const GENRES = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
];

export const NAVLINKS = [
  {
    href: "/protected",
    label: "Home",
    icon: FaHome,
  },
  {
    href: "/protected/recommendations",
    label: "Recs",
    icon: FaBell,
  },
  {
    href: "/protected/movies",
    label: "Movies",
    icon: FaFilm,
  },
  {
    href: "/protected/profile",
    label: "Profile",
    icon: FaUserAlt,
  }
]

export interface MovieGluFilm {
  film_id: number;
  imdb_id: number;
  imdb_title_id: string;
  film_name: string;
  other_titles: string | null;
  release_dates: ReleaseDate[];
  age_rating: AgeRating[];
  film_trailer: string;
  synopsis_long: string;
  images: Images;
}

export interface ReleaseDate {
  release_date: string;
  notes: string;
}

export interface AgeRating {
  rating: string;
  age_rating_image: string;
  age_advisory: string;
}

export interface Images {
  poster: { [key: string]: ImageDetails };
  still: { [key: string]: ImageDetails };
}

export interface ImageDetails {
  image_orientation: string;
  region: string;
  medium: ImageSize;
}

export interface ImageSize {
  film_image: string;
  width: number;
  height: number;
}

const MOVIE_OBJECT_EXAMPLE = {
  "film_id": 7772,
  "imdb_id": 82971,
  "imdb_title_id": "tt0082971",
  "film_name": "Raiders of the Lost Ark",
  "other_titles": null,
  "release_dates": [
      {
          "release_date": "1992-07-01",
          "notes": "XXX"
      }
  ],
  "age_rating": [
      {
          "rating": "PG ",
          "age_rating_image": "https://assets.movieglu.com/age_rating_logos/xx/pg.png",
          "age_advisory": "Contains moderate violence and mild language"
      }
  ],
  "film_trailer": "https://trailer.movieglu.com/7772_high.mp4",
  "synopsis_long": "As the Third Reich continues its reign of terror, Adolf Hitler is on a quest for the legendary Ark os the Covenenant- resting place of the Ten Commandments- whose supernatural powers, legend says, can wipe out entire armies.\n\nThe U.S. Government turns to Dr. Indiana Jones, for the mission.  Relentlessly pursued by Hitler's henchmen, Indy infiltrartes their massive digging operation in a race against time to discover the Well od the Souls, where the Ark has lain undisturbed for centuries.",
  "images": {
      "poster": {
          "1": {
              "image_orientation": "portrait",
              "region": "UK",
              "medium": {
                  "film_image": "https://image.movieglu.com/7772/GBR_007772h0.jpg",
                  "width": 200,
                  "height": 300
              }
          }
      },
      "still": {
          "1": {
              "image_orientation": "landscape",
              "medium": {
                  "film_image": "https://image.movieglu.com/7772/007772h2.jpg",
                  "width": 300,
                  "height": 200
              }
          }
      }
  }
}

export interface UserPreferences {
  fav_actors: string[];
  fav_directors: string[];
  fav_genres: string[];
  fav_companies: string[];
}

export interface MovieTheater {
  cinema_id: string;
  cinema_name: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  county: string;
  country: string;
  postcode: string;
  phone: string;
  lat: number;
  lng: number;
  distance: number;
  logo_url: string;
}

export type MovieSource = {
  id: string;
  fromActor: boolean;
  fromDirector: boolean;
  fromDistributor: boolean;
};






export interface Cinema {
  cinema_id: number;
  cinema_name: string;
}


export interface FilmImageDetails {
  film_image: string;
  width: number;
  height: number;
}

export interface FilmImages {
  poster: { [key: string]: { image_orientation: string; region: string; medium: FilmImageDetails } };
  still: { [key: string]: { image_orientation: string; medium: FilmImageDetails } };
}

export interface ShowingTime {
  start_time: string;
  end_time: string;
}

export interface Showings {
  [version_type: string]: {
    film_id: number;
    film_name: string;
    times: ShowingTime[];
  };
}

export interface ShowDate {
  date: string;
}

export interface Film {
  film_id: number;
  imdb_id: number;
  imdb_title_id: string;
  film_name: string;
  other_titles: string | null;
  version_type: string;
  age_rating: AgeRating[];
  images: FilmImages;
  showings: Showings;
  show_dates: ShowDate[];
}

export interface Status {
  count: number;
  state: string;
  method: string;
  message: string | null;
  request_method: string;
  version: string;
  territory: string;
  device_datetime_sent: string;
  device_datetime_used: string;
}

export interface CinemaShowtimesResponse {
  cinema: Cinema;
  films: Film[];
  status: Status;
}

export interface MergedData {
  film_id: number;
  imdb_id: number;
  imdb_title_id: string;
  film_name: string;
  other_titles: string | null;
  version_type: string;
  age_rating: AgeRating[];
  images: FilmImages;
  showings: Showings;
  show_dates: ShowDate[];
  cinema_id: number;
  cinema_name: string;
  id: string;
  fromActor: boolean;
  fromDirector: boolean;
  fromDistributor: boolean;
}