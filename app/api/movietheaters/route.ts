export async function GET() {

  const API_URL = process.env.MOVIEGULU_API_ENDPOINT;
  const CLIENT = process.env.MOVIEGULU_CLIENT;
  const API_KEY = process.env.MOVIEGULU_API_KEY;
  const AUTH = process.env.MOVIEGULU_AUTHORIZATION;
  const TERRITORY = process.env.MOVIEGULU_TERRITORY;
  const API_VERSION = process.env.MOVIEGULU_API_VERSION;
  const GEOLOC = process.env.MOVIEGULU_GEOLOCATION;

  const res = await fetch(`${API_URL}/cinemasNearby/?n=6`, {
    headers: {
      "client":CLIENT ? CLIENT : "",
      "x-api-key":API_KEY ? API_KEY : "",
      "authorization":AUTH ? AUTH : "",
      "territory":TERRITORY ? TERRITORY : "",
      "api-version":API_VERSION ? API_VERSION : "",
      "geolocation":GEOLOC ? GEOLOC : "",
      "device-datetime": new Date().toISOString(),
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
