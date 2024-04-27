"use client";

import { useState } from "react";
import { MovieGluFilm } from "@/utils/constants";
import MovieCard from "./MovieCard";

interface Props {
  moviesNowShowing: MovieGluFilm[];
  moviesComingUp: MovieGluFilm[];
}

export const MoviesPageList = ({ moviesNowShowing, moviesComingUp }: Props) => {
  const [nowPlaying, setNowPlaying] = useState<boolean>(true);

  return (
    <section className="movies-page-content">

      <div className="movies-page-header">

        <button className={`movies-page-toggle-btn ${nowPlaying && "bg-gray-500"}`}
          onClick={() => setNowPlaying(true)}
        >
          Now Playing
        </button>

        <button className={`movies-page-toggle-btn ${!nowPlaying && "bg-gray-500"}`}
          onClick={() => setNowPlaying(false)}
        >
          Coming Soon
        </button>

      </div>

      <div className="movies-page-cards-container">
        {(nowPlaying ? moviesNowShowing : moviesComingUp).map(
          (movie: MovieGluFilm) => {
            return (
              <button key={movie.film_id} className="movie-btn">
                <MovieCard movie={movie} />
              </button>
            );
          }
        )}
      </div>

    </section>
  );
};
