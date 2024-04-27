import Image from "next/image";
import { MovieGluFilm } from "@/utils/constants";

interface Props {
    movie: MovieGluFilm;
}

const MovieCard = ({movie}:Props) => {
  return (
    <div className="hp-mcu-movie">
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
  )
}

export default MovieCard;