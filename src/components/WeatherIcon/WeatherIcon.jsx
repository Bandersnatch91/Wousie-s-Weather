import { ICON_URL } from '../../utils/constants';

export default function WeatherIcon({ code, description, size = 80 }) {
  return (
    <img
      src={ICON_URL(code)}
      alt={description || 'Weather icon'}
      style={{ width: size, height: size }}
    />
  );
}
