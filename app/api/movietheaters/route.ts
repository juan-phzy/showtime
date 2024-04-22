import type { NextApiRequest, NextApiResponse } from 'next';


export async function GET() {
    const res = await fetch('https://api-gate2.movieglu.com/cinemasNearby/?n=5', {
      headers: {
        "client":"NYIT",
        "x-api-key":"1DwsUCc08p2EAhMgwm7Ff8RxwAry7UwCAjcalKTj",
        "authorization":"Basic TllJVF9YWDpFNE1WcHk2MHdjZEE=",
        "territory":"XX",
        "api-version":"v200",
        "geolocation":"-22.0;14.0",
        "device-datetime": new Date().toISOString(),
      },
    });
    const data = await res.json();
 
    return Response.json({ data });
  }
