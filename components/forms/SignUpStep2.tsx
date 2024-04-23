"use client"

import { createClient } from "@/utils/supabase/client";
import { CinemaData, SignUpSearchParams } from "@/utils/constants";
import CinemaCard from '../cards/CinemaCard';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
	uid: string;
	searchParams: SignUpSearchParams;
}

async function getTheaters() {
	const res = await fetch('/api/movietheaters') // Adjust the endpoint as necessary
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}

export default function SignUpStep2({ uid, searchParams }: Readonly<SignUpFormProps>){
	const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
	const [cinemas1, setCinemas1] = useState<CinemaData[]>([]);
	const [cinemas2, setCinemas2] = useState<CinemaData[]>([]);
	const [error, setError] = useState(null);
	const router = useRouter();

	useEffect(() => {
		getTheaters()
			.then((data) => {
				setCinemas1(data.data.cinemas.slice(0, 3));
				setCinemas2(data.data.cinemas.slice(3, 6));
			})
			.catch(setError);
		// ADD ERROR HANDLING LATER
	}, []);

	const submitTheater = async () => {
		if(!selectedTheater) {
			return router.push(`/protected/complete-sign-up?step=2&error=true&message=${'No theater selected'}`);
		} 
		console.log("Submitting: ",selectedTheater);

		const supabase = createClient();
		const { data, error } = await supabase
			.from('generalUsers')
			.update({ favoriteTheater: selectedTheater })
			.eq('auth_id', uid)
			.select()

		if (error) {
			return router.push(`/protected/complete-sign-up?step=2&error=true&message=${error.message}`);
		}
		if (data) {
			console.log("User data updated successfully: ", data);
			return router.push(`/protected/complete-sign-up?step=3`);
		}
	}

  return (
    <section className='signup-step2'>
			<div className='signup-step2-content'>
				<div className="theaterlist-container">
					<div className="theaterlist-set">	
						{cinemas1.length > 0 && (cinemas1.map((cinema:CinemaData) =>
							{
								return (
									<button 
										key={cinema.cinema_id} 
										className='flex justify-center items-center w-fit h-fit'
										onClick={() => setSelectedTheater(cinema.cinema_id.toString())}
										>
										<CinemaCard
											selected={selectedTheater === cinema.cinema_id.toString()}
											title={cinema.cinema_name} 
											distance={cinema.distance} 
											address={cinema.address} 
											city={cinema.city} 
											state={cinema.state} 
										/>
									</button>
								)
							}))
						}
					</div>
					<div className="theaterlist-set">
						{cinemas2.length > 0 && (cinemas2.map((cinema:CinemaData) =>
							{
								return (
									<button 
										key={cinema.cinema_id} 
										className='flex justify-center items-center w-fit h-fit'
										onClick={() => setSelectedTheater(cinema.cinema_id.toString())}
										>
										<CinemaCard
											selected={selectedTheater === cinema.cinema_id.toString()}
											title={cinema.cinema_name} 
											distance={cinema.distance} 
											address={cinema.address} 
											city={cinema.city} 
											state={cinema.state} 
										/>
									</button>
								)
							}))
						}
					</div>
				</div>
				<button onClick={submitTheater} className='w-[200px] h-fit p-1 bg-[#F47A62] text-white rounded-md'>Submit</button>
				<div className="flex justify-center items-center w-fit h-fit p-1 text-sm">
					{searchParams?.error && (
					<p className="p-4 bg-red-500 text-white text-center">
						Error:
					</p>
					)}
					{searchParams?.message && (
						<p className="p-4 text-center bg-gray-700">
							{searchParams.message}
						</p>
					)}
				</div>
			</div>
		</section>
  );
}