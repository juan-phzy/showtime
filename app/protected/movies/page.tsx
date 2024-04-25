import { MovieGluFilm } from "@/utils/constants";


//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  DO NOT MODIFY  vvvvvvvvvv
const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
const CLIENT = process.env.MOVIEGULU_CLIENT;
const API_KEY = process.env.MOVIEGULU_API_KEY;
const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
const TERRITORY = process.env.MOVIEGULU_TERRITORY;
const API_VERSION = process.env.MOVIEGULU_API_VERSION;
const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;
async function getMoviesNowShowing() {
  const res = await fetch(`${API_URL}/filmsNowShowing/?n=5`, {
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
  const res = await fetch(`${API_URL}/filmsComingSoon/?n=5`, {
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
	const res1 = await getMoviesNowShowing();
	const { data: { films:moviesNowShowing } } : { data: { films:MovieGluFilm[]}} = await res1.json();

	const res2 = await getMoviesComingUp();
	const { data: { films:moviesComingUp } } : { data: { films:MovieGluFilm[]}} = await res2.json();
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  DO NOT MODIFY  ^^^^^^^^^^^^
	
	return (
		<section className="movies-page-container">
			{/**
			 * 
			 * The two data sets you need are: moviesNowShowing and moviesComingUp
       * 
			 * They are arrays of MovieGluFilm objects and they are already set up in this file
			 * You can view the MovieGluFilm interface in the utils/constants.ts file
			 * There is also an example of a MovieGluFilm object in the utils/constants.ts file
       * 
			 * All of your "HTML" goes within this home-page-container section
       * The class name movies-page-container is already set up for you in the globals.css file
			 * Add the rest of your classes under it
			 * 
			 */}

			<div>This is the movies Page</div>
		</section>
	);
}

"use client"
import {useState} from "react";


export default function MoviesPage () {

  const [nowPlaying,setNowPlaying] = useState<boolean>(true)

  const moviesPlaying = ["Avengers:Endgame", "Now Playing","Now Playing","Now Playing","Now Playing","Now Playing"]
  const moviesComingSoon = ["Coming Soon","Coming Soon", "Coming Soon"]

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
          
          (movie, index) => { return ( <button key={index} className="border-solid border-white border-2 w-1/2 hover:bg-white/60">{movie}</button> ) }  
          
          )}      

        </div>
      </div>
    </section>
    
  )
}

