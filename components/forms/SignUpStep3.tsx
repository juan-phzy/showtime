"use client";
//------------------------------------------------------------Importing Required Libraries
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GENRES } from "@/utils/constants";
import PreferenceCard from "../cards/PreferenceCard";
import { useRouter } from "next/navigation";
import { createRecommendations, filterPreferences } from "@/utils/utilityFuncs";

//------------------------------------------------------------Function to fetch data from the API
async function getChoiceLists() {
  const res = await fetch("/api/choiceslist"); // Adjust the endpoint as necessary
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

interface Props {
	preferenceData: any;
}

//------------------------------------------------------------Component Starts Here
export default function SignUpStep3({preferenceData}: Readonly<Props>) {
  
  const [actors, setActors] = useState<[string,string[]][]>([]);
  const [directors, setDirectors] = useState<[string,string[]][]>([]);
  const [distributors, setDistributors] = useState<[string,string[]][]>([]);
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
        console.log(data);
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


    console.log("SA: ",selectedActors);
    console.log("SD: ",selectedDirectors);
    console.log("SDI: ",selectedDistributors);
    console.log("SG: ",selectedGenres);

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

    
    const filteredActors = filterPreferences(actors, selectedActors);
    const filteredDirectors = filterPreferences(directors, selectedDirectors);
    const filteredDistributors = filterPreferences(distributors, selectedDistributors);


    
    createRecommendations(supabase, filteredActors, filteredDirectors, filteredDistributors, selectedGenres, user?.id);


    if (error) {
      return console.log(error.message);
    }
    if (data) {
      console.log("Successfully Updated Supabase Preferences");
      return router.replace("/protected");
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
                key={director[0]}
                onClick={() => {
                  handleDirectorClick(director[0]);
                }}
              >
                <PreferenceCard
                  isName={true}
                  text={director[0]}
                  selected={selectedDirectors.includes(director[0])}
                />
              </button>
            );
          })}
        </div>
        <div className="signup-step3-title">Actors:</div>
        <div className="signup-step3-cards-container scroll-x-only mb-2">
          {actors.map((actor, index) => {
            return (
              <button
                key={actor[0]}
                onClick={() => {
                  handleActorClick(actor[0]);
                }}
              >
                <PreferenceCard
                  isName={true}
                  text={actor[0]}
                  selected={selectedActors.includes(actor[0])}
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
                key={distributor[0]}
                onClick={() => {
                  handleDistributorClick(distributor[0]);
                }}
              >
                <PreferenceCard
                  isName={false}
                  text={distributor[0]}
                  selected={selectedDistributors.includes(distributor[0])}
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
