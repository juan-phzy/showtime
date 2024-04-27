import { MovieGluFilm } from "@/utils/constants";
import Image from "next/image";

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
              <div key={movie.film_id} className="hp-mcu-movie">
                <div className="movie-card-image flex justify-center items-center w-fit h-fit border-solid border-white border-2 relative">
                  <Image
                    className="object-contain"
                    src={movie.images.poster["1"].medium.film_image}
                    alt={movie.film_name}
                    width={200}
                    height={300}
                  />
                </div>

                <div className="text-left w-full h-fit relative ellipsed text-amber-400">
                  {movie.film_name}
                </div>
                <div className="flex justify-start items-center w-full h-fit text-xs">
                  Age Rating: {movie.age_rating[0].rating}
                </div>
              </div>
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
