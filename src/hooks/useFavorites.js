import { useState, useCallback } from 'react';

const STORAGE_KEY = 'weather-app-favorites';

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  const addFavorite = useCallback((city) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.lat === city.lat && f.lon === city.lon
      );
      if (exists) return prev;
      const updated = [...prev, city];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((city) => {
    setFavorites((prev) => {
      const updated = prev.filter(
        (f) => !(f.lat === city.lat && f.lon === city.lon)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { favorites, addFavorite, removeFavorite };
}
