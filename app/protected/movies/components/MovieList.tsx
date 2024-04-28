"use client"

import {useState} from "react"
import {MovieGluFilm} from "@/utils/constants"
import MovieCard from "@/components/cards/MovieCard"

interface Props{
    moviesNowShowing: MovieGluFilm[];
    moviesComingUp: MovieGluFilm[];
}

export const MovieList = ({moviesNowShowing,moviesComingUp}: Props) => {
  
    const [nowPlaying,setNowPlaying] = useState<boolean>(true)

    return (
        <section className = "movies-page-container">
            <div className = "movies-pages-content">
                <div className = "movies-page-header mb-4">
                    <button className={`movie-page-buttons  ${nowPlaying && "bg-[#F47A62] text-black font-bold"}`}
                    onClick={() =>   
                    setNowPlaying(true)}>
                        Now Playing
                    </button>
                    <button
                    className={`movie-page-buttons ${!nowPlaying && "bg-[#F47A62] text-black font-bold"}`}
                    onClick={() => setNowPlaying(false)}>
                        Coming Soon
                    </button>
                </div>
                <div className = "movie-card-container "> 
                    { (nowPlaying? moviesNowShowing: moviesComingUp).map(
                        
                        (movie:MovieGluFilm, index) => { return ( 
                        <button key={index} className="movie-card"><MovieCard
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
