import { MovieGluFilm } from "@/utils/constants";
import { FaAngleRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface Props {
  title: string;
  movies: MovieGluFilm[];
}

const HomeMovieList = ({ title, movies }: Props) => {
  function setLink(title: string): string {
    if (title === "Now Showing") {
      return "/protected/movies";
    } else if (title === "Coming Soon") {
      return "/protected/movies?choice=soon";
    } else {
      return "/protected/recommendations";
    }
  }

  const link = setLink(title);
  return (
    <>
      <div className="hp-mcu-title">
        <span>{title}</span>
        <Link
          href={link}
          className="flex justify-center items-center h-fit w-fit gap-2"
        >
          {"See all "}
          <FaAngleRight className="text-amber-400" size={20} />
        </Link>
      </div>
      <div className="hp-mcu-movies scroll-x-only">
        {movies.length > 0 ? (
          movies.map((movie) => {
            return (
            <Link href={`/protected/movie-details/${movie.film_id}`} key={movie.film_id} className="movie-btn">
              <MovieCard key={movie.film_id} movie={movie} />
            </Link>
          )})
        ) : (
          <div className="flex justify-center items-center w-full h-full p-5">
            <span>No movies found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeMovieList;
