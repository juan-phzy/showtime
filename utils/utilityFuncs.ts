import { MovieGluFilm, MovieSource, CinemaShowtimesResponse, MergedData, ShowingTime } from "./constants";

export function getHeaderText(step: string): string{
    switch (step) {
      case "1":
        return "Complete Account Information";
      case "2":
        return "Choose Your Favorite Theater";
      case "3":
        return "Set Your Movie Preferences";
      default:
        return "Complete Sign Up";
    } 
}

export function filterArrays(arrs: [string | null, number[]][]): [string, string[]][] {
  const result: Map<string, Set<number>> = new Map();

  // Aggregate arrs with unique ids, skip if the name name is null
  arrs.forEach(([name, ids]) => {
      if (name !== null) {  // Skip entries with null arrs
          if (!result.has(name)) {
              result.set(name, new Set(ids));
          } else {
              const existingSet = result.get(name);
              ids.forEach(id => existingSet?.add(id));
          }
      }
  });

  // Convert the map back to the required array structure with string arrays
  const filteredArrs: [string, string[]][] = [];
  result.forEach((idSet, name) => {
      const stringIds = Array.from(idSet, id => id.toString());  // Convert numbers to strings
      filteredArrs.push([name, stringIds]);
  });

  return filteredArrs;
}


export function filterPreferences(directors: [string, string[]][], chosenDirectors: string[]): [string, string[]][] {
  // Filter the directors array based on whether the director's name is included in the chosenDirectors array
  const filteredDirectors = directors.filter(([directorName, _]) => chosenDirectors.includes(directorName));
  return filteredDirectors;
}



export async function createRecommendations(supabase: any, actors: [string, string[]][], directors: [string, string[]][], distributors: [string, string[]][], genres: string[], authId: string) {
  console.log("\N\NCREATING recommendations\N");
  console.log("Actors: ", actors);
  console.log("Directors: ", directors);
  console.log("Distributors: ", distributors);
  console.log("Genres: ", genres);

  // Create a map to store unique movies with their attributes
  const movies = new Map<string, { id: string, fromActor: boolean, fromDirector: boolean, fromDistributor: boolean }>();

  // Helper function to add or update movie entries
  const addOrUpdateMovie = (id: string, source: 'actor' | 'director' | 'distributor') => {
      const existing = movies.get(id) || { id: id, fromActor: false, fromDirector: false, fromDistributor: false };
      if (source === 'actor') {
          existing.fromActor = true;
      } else if (source === 'director') {
          existing.fromDirector = true;
      } else if (source === 'distributor') {
          existing.fromDistributor = true;
      }
      movies.set(id, existing);
  };

  // Process actors array
  actors.forEach(([_, ids]) => {
      ids.forEach(id => addOrUpdateMovie(id, 'actor'));
  });

  // Process directors array
  directors.forEach(([_, ids]) => {
      ids.forEach(id => addOrUpdateMovie(id, 'director'));
  });

  // Process distributors array
  distributors.forEach(([_, ids]) => {
      ids.forEach(id => addOrUpdateMovie(id, 'distributor'));
  });

  // Convert the map to an array of movie objects
  const finalMovies = Array.from(movies.values());

  console.log('\NFINAL MOVIES: ',finalMovies);

  console.log("\nEnd of createRecommendations\n");

  const jsonString = JSON.stringify(finalMovies);

  const { data, error } = await supabase
  .from('preferences')
  .update({ recommendedMovies: jsonString })
  .eq('auth_id', authId);

  if (error) {
      console.error("Failed to create recommendations", error);
  } else {
      console.log("Successfully created recommendations")
      console.log("Data: ", data);
  }
}



export function mergeFilmObjects(details: CinemaShowtimesResponse | null, source: MovieSource): MergedData | null {
  if (!details || !details.films || details.films.length === 0) {
    console.error("Invalid details provided to mergeFilmObjects:", details);
    return null;
  }

  // console.log("Details: ", details);
  // console.log("Source: ", source);

  if (details.films[0].film_id.toString() === source.id) {
    return { ...details.cinema, ...details.films[0], ...source };
  }

  return null;
}



const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
const CLIENT = process.env.MOVIEGULU_CLIENT;
const API_KEY = process.env.MOVIEGULU_API_KEY;
const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
const TERRITORY = process.env.MOVIEGULU_TERRITORY;
const API_VERSION = process.env.MOVIEGULU_API_VERSION;
const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;
async function getFilmDetails(filmID: string, cinemaID: string, showDate: string) {
  try {
    const res = await fetch(`${API_URL}/cinemaShowTimes/?film_id=${filmID}&cinema_id=${cinemaID}&date=${showDate}`, {
      method: "GET",
      headers: {
        "client": CLIENT ?? "",
        "x-api-key": API_KEY ?? "",
        "authorization": AUTH ?? "",
        "territory": TERRITORY ?? "",
        "api-version": API_VERSION ?? "",
        "geolocation": GEOLOC ?? "",
        "device-datetime": new Date().toISOString(),
      },
    });

    if (!res.ok) {
      // If the response is not ok, then throw an error with the status
      throw new Error(`API call failed with status: ${res.status} and status text: ${res.statusText}`);
    }

    // Read the text of the response
    const text = await res.text();
    // console.log("Response text:", text);

    // Now attempt to parse the text as JSON
    const data = JSON.parse(text); // This might throw if the text is not valid JSON
    // console.log("Data received from getFilmDetails:", data);
    return data;
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error in getFilmDetails:", error);
    // You may decide to rethrow the error or handle it in some way
    // For example, return null or a default object
    return null;
  }
}


export async function finalMerge(source:MovieSource, favTheater:string) {
  let showDates = [];

  for (let i = 1; i < 4; i++) {
    const showDate = getDate(i);
    showDates.push(showDate);
  }

  // Wait for all promises to resolve and then return the results
  const movieShowTimes = await Promise.all(showDates.map(async (showDate) => {

    const data = await getFilmDetails(source.id, favTheater, showDate);

    //console.log("DATA FROM FINALMERGE---------------: ", data);

    const mergedFilm = mergeFilmObjects(data, source);
    //console.log("MERGED FILM FROM FINALMERGE---------------: ", mergedFilm);

    return mergedFilm;
  }));

  //console.log("MOVIE SHOW TIMES FROM FINALMERGE---------------: ", movieShowTimes);

  const filteredData = movieShowTimes.filter((x): x is MergedData => x !== null); // Filter out any nulls
  // console.log("FILTERED DATA FROM FINALMERGE---------------: ", filteredData);

  return filteredData; // Filter out any nulls
}

export async function processData(recommendedMovieIds: MovieSource[], favTheater: string) {
  const finalDataPromises = recommendedMovieIds.map((movie) => finalMerge(movie, favTheater));
  
  // Wait for all promises to resolve
  const finalDataArrays = await Promise.all(finalDataPromises);

  // Flatten the array of arrays into a single array of MergedData objects.
  //const flattenedData = finalDataArrays.flat();

  // console.log("FINAL DATA PROMISES: ", flattenedData);
  return finalDataArrays;
}



export function getDate(daysAhead: number) {
  const today = new Date();
  const newDate = new Date(today);

  // Set tomorrow's date
  newDate.setDate(newDate.getDate() + daysAhead);

  // Format date as "YYYY-MM-DD"
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1
  const day = newDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function filterShowtimes(showtimes: ShowingTime[], period: string): ShowingTime[] {
  // Helper function to convert time string to numeric hour value
  function timeToHour(timeStr: string): number {
      const [hour, minute] = timeStr.split(':').map(Number);
      return hour + minute / 60;
  }

  return showtimes.filter(showtime => {
      const startHour = timeToHour(showtime.start_time);

      switch (period) {
          case 'morning':
              return startHour < 12;
          case 'afternoon':
              return startHour >= 12 && startHour < 18;
          case 'evening':
              return startHour >= 18;
          default:
              throw new Error("Invalid period specified. Use 'morning', 'afternoon', or 'evening'.");
      }
  });
}