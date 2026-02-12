export const API_KEY = import.meta.env.VITE_OWM_API_KEY;
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const ICON_URL = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export const UNITS_LABEL = {
  metric: { temp: '°C', speed: 'm/s' },
  imperial: { temp: '°F', speed: 'mph' },
};
