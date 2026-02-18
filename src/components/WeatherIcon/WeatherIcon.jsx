import { ICON_URL } from '../../utils/constants';
import styles from './WeatherIcon.module.css';

function getAnimationClass(code) {
  if (!code) return '';
  const id = code.slice(0, 2);
  switch (id) {
    case '01': return styles.sunny;
    case '02':
    case '03':
    case '04': return styles.cloudy;
    case '09':
    case '10': return styles.rainy;
    case '11': return styles.stormy;
    case '13': return styles.snowy;
    case '50': return styles.misty;
    default: return '';
  }
}

export default function WeatherIcon({ code, description, size = 80 }) {
  return (
    <img
      className={`${styles.icon} ${getAnimationClass(code)}`}
      src={ICON_URL(code)}
      alt={description || 'Weather icon'}
      style={{ width: size, height: size }}
    />
  );
}
