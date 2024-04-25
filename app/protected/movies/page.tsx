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

