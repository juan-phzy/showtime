"use client"
//------------------------------------------------------------Importing Required Libraries
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GENRES } from "@/utils/constants";
import PreferenceCard from "../cards/PreferenceCard";

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
    <section className="signup-step3">
		<div className="signup-step3-title">Directors:</div>
		<div className="signup-step3-cards-container">
			{directors.map((director)=>{
				return (
					<PreferenceCard isName={true} text={director} selected={false} />
				)
			})}
		</div>
		<div className="signup-step3-title">Actors:</div>
		<div className="signup-step3-cards-container">
			{actors.map((actor)=>{
				return (
					<PreferenceCard isName={true} text={actor} selected={false} />
				)
			})}
		</div>
		<div className="signup-step3-title">Genres:</div>
		<div className="signup-step3-cards-container">
			{genres.map((genre)=>{
				return (
					<PreferenceCard isName={false} text={genre} selected={false} />
				)
			})}
		</div>
		<div className="signup-step3-title">Companies:</div>
		<div className="signup-step3-cards-container">
			{distributors.map((distributor)=>{
				return (
					<PreferenceCard isName={false} text={distributor} selected={false} />
				)
			})}
		</div>
	</section>
  )
}