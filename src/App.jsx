import { useState, useEffect } from 'react';
import { geocodeCity } from './api/weatherApi';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useFavorites } from './hooks/useFavorites';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import Forecast from './components/Forecast/Forecast';
import AirQuality from './components/AirQuality/AirQuality';
import Favorites from './components/Favorites/Favorites';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import styles from './App.module.css';

function App() {
  const [coords, setCoords] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [searchError, setSearchError] = useState(null);

  const { current, forecast, airQuality, loading, error } = useWeather(coords, units);
  const { position, geoError, requestLocation } = useGeolocation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Request geolocation on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // When geolocation resolves, use it (only if no coords yet)
  useEffect(() => {
    if (position && !coords) {
      setCoords(position);
    }
  }, [position]);

  // Update city display name from API response
  useEffect(() => {
    if (current) {
      setCityInfo({ name: current.name, country: current.sys.country });
    }
  }, [current]);

  const handleSearch = async (cityName) => {
    setSearchError(null);
    try {
      const geo = await geocodeCity(cityName);
      setCoords({ lat: geo.lat, lon: geo.lon });
      setCityInfo({ name: geo.name, country: geo.country });
    } catch (err) {
      setSearchError(err.message);
    }
  };

  const handleSelect = (geo) => {
    setSearchError(null);
    setCoords({ lat: geo.lat, lon: geo.lon });
    setCityInfo({ name: geo.name, country: geo.country });
  };

  const handleFavoriteClick = (fav) => {
    setCoords({ lat: fav.lat, lon: fav.lon });
    setCityInfo({ name: fav.name, country: fav.country });
  };

  const handleToggleUnits = () => {
    setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const handleAddFavorite = () => {
    if (cityInfo && coords) {
      addFavorite({ ...cityInfo, ...coords });
    }
  };

  const handleRemoveFavorite = (fav) => {
    removeFavorite(fav);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <img src="/wousie.jpg" alt="Wousie" className={styles.logo} />
          <h1 className={styles.title}>Wousie's Weather</h1>
        </div>
        <button className={styles.unitsToggle} onClick={handleToggleUnits}>
          {units === 'metric' ? '\u00B0C / \u00B0F' : '\u00B0F / \u00B0C'}
        </button>
      </header>

      <SearchBar onSearch={handleSearch} onSelect={handleSelect} onLocate={requestLocation} />

      {searchError && (
        <ErrorMessage
          message={searchError}
          onDismiss={() => setSearchError(null)}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {geoError && !coords && <ErrorMessage message={geoError} />}

      {loading && <Loader />}

      {!loading && current && (
        <>
          <CurrentWeather data={current} units={units} />
          <HourlyForecast data={forecast} units={units} />
          <Forecast data={forecast} units={units} />
          <AirQuality data={airQuality} />
        </>
      )}

      {!loading && !current && !error && !searchError && (
        <p className={styles.welcome}>
          Search for a city or allow location access to see the weather.
        </p>
      )}

      <Favorites
        favorites={favorites}
        currentCity={cityInfo}
        coords={coords}
        onSelect={handleFavoriteClick}
        onAdd={handleAddFavorite}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}

export default App;
