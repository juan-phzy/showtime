"use client"

import { MovieGluFilm } from "@/utils/constants";
import {useEffect, useState} from "react"
import MovieCard from "../../../components/cards/MovieCard"




//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
const CLIENT = process.env.MOVIEGULU_CLIENT;
const API_KEY = process.env.MOVIEGULU_API_KEY;
const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
const TERRITORY = process.env.MOVIEGULU_TERRITORY;
const API_VERSION = process.env.MOVIEGULU_API_VERSION;
const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;

async function getMoviesNowShowing() {
  const res = await fetch(`${API_URL}/filmsNowShowing/?n=1`, {
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
  const res = await fetch(`${API_URL}/filmsComingSoon/?n=1`, {
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



export default async function MoviesPage() {

	//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
	

	
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^
	

  const [nowPlaying,setNowPlaying] = useState<boolean>(true)
  const [moviesPlaying,setMoviesPlaying] = useState<MovieGluFilm[]>([])
  const [moviesComingSoon,setMoviesComingSoon] = useState<MovieGluFilm[]>([])

  useEffect(() => {
    async function fetchData() {
      try { 
        const res1 = await getMoviesNowShowing();
	      const { data: { films:moviesNowShowing } } : { data: { films:MovieGluFilm[]}} = await res1.json();
        setMoviesPlaying(moviesNowShowing);
        
        const res2 = await getMoviesComingUp();
	      const { data: { films:moviesComingUp } } : { data: { films:MovieGluFilm[]}} = await res2.json();
        setMoviesComingSoon(moviesComingUp);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchData();
  }, []);


  return (
    <section className = "movies-page-container">
      <div className = "movies-pages-content">
        <div className = "movies-page-header mb-4">
          <button className={`flex justify-center items-center w-fit h-fit border-solid border-white border-2 ${nowPlaying && "bg-gray-500"}`}
            onClick={() =>   
            setNowPlaying(true)}>
            Now Playing
          </button>
          <button
            className={`flex justify-center items-center w-fit h-fit border-solid border-white border-2 ${!nowPlaying && "bg-gray-500"}`}
            onClick={() => setNowPlaying(false)}>
            Coming Soon
          </button>
        </div>
        <div className = "movie-card w-full flex flex-wrap"> 
            { (nowPlaying? moviesPlaying: moviesComingSoon).map(
              
              (movie:MovieGluFilm, index) => { return ( 
              <button key={index} className="border-solid border-white border-2 w-1/2 hover:bg-white/60"><MovieCard
              image = {movie.images.poster['1'].medium.film_image}
              name = {movie.film_name}
              rating = {""}
              watchtime = {""}
              genre = {""}/>
              </button> ) }  
              
            )}      

        </div>
      </div>
    </section>
    
  )
}

/*
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

*/
