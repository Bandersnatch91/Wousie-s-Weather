import { ICON_URL, UNITS_LABEL } from '../../utils/constants';
import { formatDayName } from '../../utils/formatters';
import styles from './Forecast.module.css';

export default function ForecastCard({ day, units }) {
  const unitLabel = UNITS_LABEL[units];

  return (
    <div className={styles.card}>
      <div className={styles.dayName}>{formatDayName(day.date)}</div>
      <img
        className={styles.icon}
        src={ICON_URL(day.icon)}
        alt={day.description}
      />
      <div className={styles.tempRange}>
        <span className={styles.tempHigh}>{day.high}{unitLabel.temp}</span>{' '}
        <span className={styles.tempLow}>{day.low}{unitLabel.temp}</span>
      </div>
      <div className={styles.desc}>{day.description}</div>
      <div className={styles.summary}>
        {day.pop > 0 && <span>Rain {day.pop}%</span>}
        <span>Humidity {day.humidity}%</span>
        <span>Wind {day.wind} {unitLabel.speed}</span>
      </div>
    </div>
  );
}
