"use client";
//------------------------------------------------------------Importing Required Libraries
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GENRES } from "@/utils/constants";
import PreferenceCard from "../cards/PreferenceCard";
import { useRouter } from "next/navigation";

//------------------------------------------------------------Function to fetch data from the API
async function getChoiceLists() {
  const res = await fetch("/api/choiceslist"); // Adjust the endpoint as necessary
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function awsAPI() {
  try {
    const apiEndpoint = 'https://qh8in503e6.execute-api.us-east-2.amazonaws.com/RecommendMovies';
    const response = await fetch(apiEndpoint, {
      method: 'GET', // Make sure this matches the method expected by the API Gateway
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recommendedMovies = await response.json();

    console.log("AWS API RESPONSE: ",recommendedMovies);
  } catch (error) {
    console.log(error);
    console.error('There was an error!', error);
  }
}

interface Props {
	preferenceData: any;
}

//------------------------------------------------------------Component Starts Here
export default function SignUpStep3({preferenceData}: Readonly<Props>) {
  const [actors, setActors] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [distributors, setDistributors] = useState<string[]>([]);
  const genres = GENRES.map((genre) => genre.name);

  const [selectedActors, setSelectedActors] = useState<string[]>(preferenceData?.fav_actors || []);
  const [selectedDirectors, setSelectedDirectors] = useState<string[]>(preferenceData?.fav_directors || []);
  const [selectedDistributors, setSelectedDistributors] = useState<string[]>(
    preferenceData?.fav_companies || []
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(preferenceData?.fav_genres || []);

  const router = useRouter();

  useEffect(() => {
    getChoiceLists()
      .then((data) => {
        setActors(data.lists.actors);
        setDirectors(data.lists.directors);
        setDistributors(data.lists.distributors);
      })
      .catch((error) => {
        console.log(error);
      });
    // ADD ERROR HANDLING LATER
  }, []);

  const submitPreferences = async () => {
    console.log("Submitting: Preferences");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return console.log("No user found");
    }

    const { data, error } = await supabase
    .from("preferences")
    .upsert([
      {
        auth_id: user?.id,
        fav_actors: selectedActors,
        fav_genres: selectedGenres,
        fav_directors: selectedDirectors,
        fav_companies: selectedDistributors,
      },
    ])
    .select();

    awsAPI().then((data) => {
      console.log(data);
    }
    ).catch((error) => {
      console.log(error);
    });
    

    if (error) {
      return console.log(error.message);
    }
    if (data) {
      return console.log("Successfully Updated Supabase Preferences");
     // return router.replace("/protected");
    }
  };

  const handleDirectorClick = (director: string) => {
    if (selectedDirectors.includes(director)) {
      setSelectedDirectors(
        selectedDirectors.filter((item) => item !== director)
      );
    } else {
      setSelectedDirectors([...selectedDirectors, director]);
    }
  };
  const handleActorClick = (actor: string) => {
    if (selectedActors.includes(actor)) {
      setSelectedActors(selectedActors.filter((item) => item !== actor));
    } else {
      setSelectedActors([...selectedActors, actor]);
    }
  };
  const handleDistributorClick = (distributor: string) => {
    if (selectedDistributors.includes(distributor)) {
      setSelectedDistributors(
        selectedDistributors.filter((item) => item !== distributor)
      );
    } else {
      setSelectedDistributors([...selectedDistributors, distributor]);
    }
  };
  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const hasNotLoaded = actors.length === 0 && directors.length === 0 && distributors.length === 0;

  return (
    <>
      {hasNotLoaded && (
          <section className="signup-step3"> Loading...</section>
        )}

      <section className={`signup-step3 ${hasNotLoaded && 'hidden'}`}>
        <div className="signup-step3-title">Directors:</div>
        <div className="signup-step3-cards-container scroll-x-only mb-2">
          {directors.map((director) => {
            return (
              <button
                key={director}
                onClick={() => {
                  handleDirectorClick(director);
                }}
              >
                <PreferenceCard
                  isName={true}
                  text={director}
                  selected={selectedDirectors.includes(director)}
                />
              </button>
            );
          })}
        </div>
        <div className="signup-step3-title">Actors:</div>
        <div className="signup-step3-cards-container scroll-x-only mb-2">
          {actors.map((actor) => {
            return (
              <button
                key={actor}
                onClick={() => {
                  handleActorClick(actor);
                }}
              >
                <PreferenceCard
                  isName={true}
                  text={actor}
                  selected={selectedActors.includes(actor)}
                />
              </button>
            );
          })}
        </div>
        <div className="signup-step3-title">Genres:</div>
        <div className="signup-step3-cards-container scroll-x-only mb-2">
          {genres.map((genre) => {
            return (
              <button
                key={genre}
                onClick={() => {
                  handleGenreClick(genre);
                }}
              >
                <PreferenceCard
                  isName={false}
                  text={genre}
                  selected={selectedGenres.includes(genre)}
                />
              </button>
            );
          })}
        </div>
        <div className="signup-step3-title">Companies:</div>
        <div className="signup-step3-cards-container scroll-x-only mb-2">
          {distributors.map((distributor) => {
            return (
              <button
                key={distributor}
                onClick={() => {
                  handleDistributorClick(distributor);
                }}
              >
                <PreferenceCard
                  isName={false}
                  text={distributor}
                  selected={selectedDistributors.includes(distributor)}
                />
              </button>
            );
          })}
        </div>
        <button
          className="rounded-btn max-w-[200px]"
          onClick={submitPreferences}
        >
          Submit
        </button>
      </section>
    </>
  );
}
