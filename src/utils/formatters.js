export function groupForecastByDay(list) {
  const days = {};
  for (const entry of list) {
    const date = entry.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(entry);
  }

  return Object.entries(days).map(([date, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    const midday =
      entries.find((e) => e.dt_txt.includes('12:00:00')) || entries[0];

    const humidities = entries.map((e) => e.main.humidity);
    const winds = entries.map((e) => e.wind.speed);
    const pop = Math.round(Math.max(...entries.map((e) => e.pop || 0)) * 100);

    return {
      date,
      high: Math.round(Math.max(...temps)),
      low: Math.round(Math.min(...temps)),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
      wind: Math.round(Math.max(...winds)),
      pop,
    };
  });
}

export function formatDayName(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) return 'Today';

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'short' });
}
