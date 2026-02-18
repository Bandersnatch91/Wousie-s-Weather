import { UNITS_LABEL } from '../../utils/constants';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import styles from './HourlyForecast.module.css';

function formatHour(dtTxt) {
  const date = new Date(dtTxt.replace(' ', 'T'));
  return date.toLocaleTimeString('en-US', { hour: 'numeric' });
}

export default function HourlyForecast({ data, units }) {
  if (!data || !data.list) return null;

  const unitLabel = UNITS_LABEL[units];
  const hours = data.list.slice(0, 8);

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Hourly Forecast</h2>
      <div className={styles.row}>
        {hours.map((entry) => {
          const pop = Math.round((entry.pop || 0) * 100);
          return (
            <div key={entry.dt} className={styles.card}>
              <div className={styles.time}>{formatHour(entry.dt_txt)}</div>
              <WeatherIcon
                code={entry.weather[0].icon}
                description={entry.weather[0].description}
                size={36}
              />
              <div className={styles.temp}>
                {Math.round(entry.main.temp)}{unitLabel.temp}
              </div>
              {pop > 0 && (
                <div className={styles.rain}>{pop}%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
