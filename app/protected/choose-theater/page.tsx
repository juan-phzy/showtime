"use client"

import { useEffect, useState } from 'react';  
import { CinemaChoiceData } from '@/utils/constants';  

async function getData() {
    const res = await fetch('/api/movietheaters') // Adjust the endpoint as necessary
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default function ChooseTheater() {
  const [theatersList, setTheatersList] = useState<CinemaChoiceData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    /*
      The reason for data.data is because the response from the API
      returns an object with the following structure:
      {data: {
          data: {
            cinemas: [],
            status: {}
          }
        }
      }
    */
    getData().then(data => setTheatersList(data.data)).catch(setError);
  }, []);

  if (error) return <div>Error loading data</div>;
  if (!theatersList) return <div>Loading...</div>;

  console.log(theatersList);
  console.log(theatersList.cinemas);

  return (
    <div className='text-wrap'>{JSON.stringify(theatersList)}</div>
  )
}
