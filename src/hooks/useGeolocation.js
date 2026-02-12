import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoError(null);
      },
      (err) => {
        setGeoError(`Location access denied: ${err.message}`);
      }
    );
  }, []);

  return { position, geoError, requestLocation };
}
