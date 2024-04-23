"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";


async function getChoiceLists() {
	const res = await fetch('/api/choiceslist') // Adjust the endpoint as necessary
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}

const SignUpStep3 = () => {

	useEffect(() => {
			getChoiceLists()
					.then((data) => {
							console.log(data)
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
    <div>SignUpStep3</div>
  )
}

export default SignUpStep3