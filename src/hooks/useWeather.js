import { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../api/weatherApi';

export function useWeather(coords, units) {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchCurrentWeather(coords.lat, coords.lon, units),
      fetchForecast(coords.lat, coords.lon, units),
    ])
      .then(([weatherData, forecastData]) => {
        if (cancelled) return;
        setCurrent(weatherData);
        setForecast(forecastData);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon, units]);

  return { current, forecast, loading, error };
}
