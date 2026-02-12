import { UNITS_LABEL } from '../../utils/constants';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import styles from './CurrentWeather.module.css';

export default function CurrentWeather({ data, units }) {
  const unitLabel = UNITS_LABEL[units];

  return (
    <div className={styles.card}>
      <div className={styles.cityName}>
        {data.name}, {data.sys.country}
      </div>
      <WeatherIcon
        code={data.weather[0].icon}
        description={data.weather[0].description}
      />
      <div className={styles.temperature}>
        {Math.round(data.main.temp)}{unitLabel.temp}
      </div>
      <div className={styles.description}>{data.weather[0].description}</div>
      <div className={styles.feelsLike}>
        Feels like {Math.round(data.main.feels_like)}{unitLabel.temp}
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <div className={styles.label}>Humidity</div>
          <div className={styles.value}>{data.main.humidity}%</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Wind</div>
          <div className={styles.value}>
            {Math.round(data.wind.speed)} {unitLabel.speed}
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Pressure</div>
          <div className={styles.value}>{data.main.pressure} hPa</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.label}>Visibility</div>
          <div className={styles.value}>
            {(data.visibility / 1000).toFixed(1)} km
          </div>
        </div>
      </div>
    </div>
  );
}
