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