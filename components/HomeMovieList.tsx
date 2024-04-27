import { MovieGluFilm } from "@/utils/constants";
import Image from "next/image";
import MovieCard from "./MovieCard";

interface Props {
  title: string;
  movies: MovieGluFilm[];
}

const HomeMovieList = ({ title, movies }: Props) => {
  return (
    <>
      <div className="hp-mcu-title">
        <span>{title}</span>
        <button>{"See all >"}</button>
      </div>
      <div className="hp-mcu-movies">
        {movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <MovieCard key={movie.film_id} movie={movie} />
            );
          })
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <span>No movies found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeMovieList;
