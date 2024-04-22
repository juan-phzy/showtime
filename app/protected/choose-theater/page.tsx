"use client"

import { useEffect, useState } from 'react';    

async function getData() {
    const res = await fetch('/api/movietheaters') // Adjust the endpoint as necessary
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default function ChooseTheater() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData().then(setData).catch(setError);
  }, []);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>{JSON.stringify(data)}</div>
  )
}
