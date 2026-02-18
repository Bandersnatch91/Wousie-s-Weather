import { API_KEY, BASE_URL, GEO_URL } from '../utils/constants';

export async function fetchCurrentWeather(lat, lon, units = 'metric') {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  if (!res.ok) {
    if (res.status === 401)
      throw new Error('Invalid API key. Check your VITE_OWM_API_KEY in the .env file.');
    throw new Error(`Weather API error: ${res.status}`);
  }
  return res.json();
}

export async function fetchForecast(lat, lon, units = 'metric') {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error(`Forecast API error: ${res.status}`);
  return res.json();
}

export async function fetchAirPollution(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!res.ok) return null;
  return res.json();
}

export async function searchCities(query) {
  const res = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item) => ({
    lat: item.lat,
    lon: item.lon,
    name: item.name,
    country: item.country,
    state: item.state || '',
  }));
}

export async function geocodeCity(cityName) {
  const res = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error(`Geocoding error: ${res.status}`);
  const data = await res.json();
  if (data.length === 0) throw new Error(`City not found: "${cityName}"`);
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
    country: data[0].country,
  };
}
