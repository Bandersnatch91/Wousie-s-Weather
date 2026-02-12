import { useState, useEffect, useRef } from 'react';
import { searchCities } from '../../api/weatherApi';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, onSelect, onLocate }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Debounced search for suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchCities(query.trim());
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (suggestion) => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    onSelect({
      lat: suggestion.lat,
      lon: suggestion.lon,
      name: suggestion.name,
      country: suggestion.country,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < suggestions.length) {
      selectSuggestion(suggestions[activeIndex]);
      return;
    }
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      setQuery('');
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const formatSuggestion = (s) => {
    const parts = [s.name];
    if (s.state) parts.push(s.state);
    parts.push(s.country);
    return parts.join(', ');
  };

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper} ref={wrapperRef}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          placeholder="Search for a city..."
          autoComplete="off"
        />
        {showDropdown && (
          <ul className={styles.dropdown}>
            {suggestions.map((s, i) => (
              <li
                key={`${s.lat}-${s.lon}`}
                className={`${styles.dropdownItem} ${
                  i === activeIndex ? styles.active : ''
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectSuggestion(s);
                }}
              >
                {formatSuggestion(s)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
      <button type="button" className={styles.locateBtn} onClick={onLocate}>
        My Location
      </button>
    </form>
  );
}
