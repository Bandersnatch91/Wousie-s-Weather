import styles from './AirQuality.module.css';

const AQI_LEVELS = [
  { label: 'Good', color: '#22c55e' },
  { label: 'Fair', color: '#eab308' },
  { label: 'Moderate', color: '#f97316' },
  { label: 'Poor', color: '#ef4444' },
  { label: 'Very Poor', color: '#7c2d12' },
];

export default function AirQuality({ data }) {
  if (!data || !data.list || data.list.length === 0) return null;

  const { main, components } = data.list[0];
  const level = AQI_LEVELS[main.aqi - 1] || AQI_LEVELS[0];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Air Quality</h2>
        <span
          className={styles.badge}
          style={{ background: level.color }}
        >
          {level.label}
        </span>
      </div>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.value}>{components.pm2_5.toFixed(1)}</span>
          <span className={styles.label}>PM2.5</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{components.pm10.toFixed(1)}</span>
          <span className={styles.label}>PM10</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{components.o3.toFixed(1)}</span>
          <span className={styles.label}>O3</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{components.no2.toFixed(1)}</span>
          <span className={styles.label}>NO2</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{components.so2.toFixed(1)}</span>
          <span className={styles.label}>SO2</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{components.co.toFixed(0)}</span>
          <span className={styles.label}>CO</span>
        </div>
      </div>
      <p className={styles.units}>All values in μg/m³</p>
    </div>
  );
}
