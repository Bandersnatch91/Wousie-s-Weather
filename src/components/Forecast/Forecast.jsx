import { groupForecastByDay } from '../../utils/formatters';
import ForecastCard from './ForecastCard';
import styles from './Forecast.module.css';

export default function Forecast({ data, units }) {
  if (!data || !data.list) return null;

  const days = groupForecastByDay(data.list);

  return (
    <div className={styles.forecast}>
      <h2 className={styles.heading}>5-Day Forecast</h2>
      <div className={styles.row}>
        {days.map((day) => (
          <ForecastCard key={day.date} day={day} units={units} />
        ))}
      </div>
    </div>
  );
}
