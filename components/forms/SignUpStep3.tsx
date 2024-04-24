"use client"
//------------------------------------------------------------Importing Required Libraries
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GENRES } from "@/utils/constants";

//------------------------------------------------------------Function to fetch data from the API
async function getChoiceLists() {
	const res = await fetch('/api/choiceslist') // Adjust the endpoint as necessary
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}



//------------------------------------------------------------Component Starts Here
export default function SignUpStep3() {
	const [actors, setActors] = useState<string[]>([]);
	const [directors, setDirectors] = useState<string[]>([]);
	const [distributors, setDistributors] = useState<string[]>([]);
	const genres = GENRES.map(genre => genre.name);

	useEffect(() => {
			getChoiceLists()
					.then((data) => {
							setActors(data.lists.actors);
							setDirectors(data.lists.directors);
							setDistributors(data.lists.distributors);
					})
					.catch((error) => {console.log(error)});
			// ADD ERROR HANDLING LATER
	}, []);

	const submitPreferences = async () => {
		
		console.log("Submitting: Preferences");

		const supabase = createClient();
		const { data: { user } } = await supabase.auth.getUser();

		if (!user) { return console.log("No user found") };
		
		const { data, error } = await supabase
			.from('preferences')
			.insert([
				{ 
					auth_id: user?.id,
					fav_actors: ["joe","jim"]
				},
			])
			.select()

		if (error) {
			return console.log(error.message);
		}
		if (data) {
			return console.log(data);
		}
	}

  return (
    <section className="flex flex-col justify-center items-center w-fit h-fit">
			<div>Step 3</div>
			<div className="flex justify-center items-center flex-wrap w-fit h-fit">
				Directors: {directors.map((director)=>{return (<div key={director} className="mx-2">| {director} |</div>)})}
			</div>
			<div className="flex justify-center items-center flex-wrap w-fit h-[100px] overflow-scroll">
				Actors: {actors.map((actor)=>{return (<div key={actor} className="mx-2">| {actor} |</div>)})}
			</div>
			<div className="flex justify-center items-center flex-wrap w-fit h-[100px] overflow-scroll">
				Genres: {genres.map((genre)=>{return (<div key={genre} className="mx-2">| {genre} |</div>)})}
			</div>
			<div className="flex justify-center items-center flex-wrap w-fit h-fit">
				Companies: {distributors.map((dis)=>{return (<div key={dis} className="mx-2">| {dis} |</div>)})}
			</div>
		</section>
  )
}