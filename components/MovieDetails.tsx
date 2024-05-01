"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
  IoIosPlay,
} from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


interface Props {
  data: any;
  tmdbData: any;
}

const MovieDetails = ({ data, tmdbData }: Props) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    setModalOpen(false);
  };

  useEffect(() => {
    // This ensures that the video is stopped if the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  function formatTime(time: number) {
    const hrs = Math.floor(time / 60);
    const mins = time % 60;
    return `${hrs}hr${mins}m`;
  }

  console.log("Movie Glu: ", data);

  //console.log("TMDB: ", tmdbData);

  const rating = {
    stars: tmdbData ? (tmdbData.movie_results[0].vote_average / 10) * 5 : null,
    votes: tmdbData ? tmdbData.movie_results[0].vote_count : null,
  };

  const fullStars = rating.stars ? Math.floor(rating.stars) : 0; // Number of full stars
  const halfStar = rating.stars ? (rating.stars % 1 >= 0.5 ? 1 : 0) : 0; // Is there a half star?
  const emptyStars = 5 - fullStars - halfStar; // Remaining stars are empty

  return (
    <section className="movie-details-content">
      <div
        className={`backdrop-blur fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center z-50 ${
          !modalOpen && "hidden"
        }`}
      >
        <button
          onClick={() => closeModal()}
          className="absolute top-10 right-10 p-2 w-fit h-fit flex justify-center items-center z-50"
        >
          <RxCross1 size={30} className="text-red-600/60 hover:text-red-500" />
        </button>
        <div className="flex justify-center items-center w-full max-w-[1000px] relative">
          {data.trailers ? <video ref={videoRef} className="w-full h-full" controls preload="none">
            <source src={data.trailers.high[0].film_trailer} type="video/mp4" />
          </video> : <div className="w-full h-full flex justify-center items-center text-white">No trailer available</div>}
        </div>
      </div>
      <div className="md-image-container">
        <Image
          className="object-cover"
          src={data.images.still ? data.images.still["1"]?.medium.film_image : "/images/welcome-image.jpg"}
          alt="Movie Details"
          fill
        />
        <div className="md-movie-card">
          <div className="md-movie-title">{data.film_name}</div>
          <div className="md-movie-time-date">{`${formatTime(
            data.duration_mins
          )} • Released on ${data.release_dates[0].release_date}`}</div>
          <div className="md-small-review">
            {"Reviews "}
            <IoIosStar className="text-amber-400" size={15} />
            {`${rating.stars?.toFixed(2) ?? "No rating"} (${
              rating.votes ? rating.votes + " votes" : "No votes"
            }) `}
          </div>
          <div className="md-large-review">
            <div className="md-big-stars">
              {Array.from({ length: fullStars }, (_, i) => (
                <IoIosStar key={i} className="text-amber-400" size={30} />
              ))}
              {halfStar === 1 && (
                <IoIosStarHalf className="text-amber-400" size={30} />
              )}
              {Array.from({ length: emptyStars }, (_, i) => (
                <IoIosStarOutline
                  key={i}
                  className="text-amber-400"
                  size={30}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
              className="md-trailer-btn"
            >
              <IoIosPlay size={20} /> Watch Trailer
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute top-5 left-5 w-fit h-fit flex justify-center items-center gap-2"
        >
          <IoArrowBack size={40} /> Go Back
        </button>
      </div>
      <div className="md-body">
        <div className="w-[90%] h-fit flex flex-col justify-center items-center gap-4">
          <div className="flex justify-start items-center w-full h-fit gap-4">
            <div className="w-[100px] h-fit text-gray-300">Movie genre:</div>
            <div>{data.genres[0].genre_name}</div>
          </div>

          <div className="flex justify-start items-center w-full h-fit gap-4">
            <div className="w-[100px] h-fit text-gray-300">Age Rating:</div>
            <div>{`${data.age_rating[0].rating} - ${data.age_rating[0].age_advisory}`}</div>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-fit">
            <div className="w-full h-fit text-xl">Movie Summary:</div>
            <div className="w-full h-fit font-light text-xs">
              {data.synopsis_long}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-fit gap-4">
            <div className="w-full h-fit text-xl">{"Director(s)"}</div>
            <div className="w-full h-fit text-light text-xs flex flex-wrap justify-start items-center gap-2">
              {data.directors.map((director: any, index: number) => {
                return (
                  <div
                    key={index + director.director_name}
                    className="h-fit w-fit px-2 py-1 bg-white/30 rounded-lg"
                  >
                    {director.director_name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-fit gap-4">
            <div className="w-full h-fit text-xl">Actors:</div>
            <div className="w-full h-fit text-light text-xs flex flex-wrap justify-start items-center gap-2">
              {data.cast.map((actor: any, index: number) => {
                return (
                  <div
                    key={index + actor.cast_name}
                    className="h-fit w-fit px-2 py-1 bg-white/30 rounded-lg"
                  >
                    {actor.cast_name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
