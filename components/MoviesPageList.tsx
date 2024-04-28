"use client";

import { useState } from "react";
import { MovieGluFilm } from "@/utils/constants";
import MovieCard from "./MovieCard";

interface Props {
  moviesNowShowing: MovieGluFilm[];
  moviesComingUp: MovieGluFilm[];
  search: { choice: string };
}

export const MoviesPageList = ({ moviesNowShowing, moviesComingUp, search }: Props) => {
  const [nowPlaying, setNowPlaying] = useState<boolean>(search.choice != "soon");

  return (
    <section className="movies-page-content">

      <div className="movies-page-header">

        <button className={`movies-page-toggle-btn ${nowPlaying && "movies-page-selected"}`}
          onClick={() => setNowPlaying(true)}
        >
          Now Playing
        </button>

        <button className={`movies-page-toggle-btn ${!nowPlaying && "movies-page-selected"}`}
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
