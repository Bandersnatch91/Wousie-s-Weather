import styles from './Favorites.module.css';

export default function Favorites({
  favorites,
  currentCity,
  coords,
  onSelect,
  onAdd,
  onRemove,
}) {
  const isSaved =
    coords &&
    favorites.some((f) => f.lat === coords.lat && f.lon === coords.lon);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Saved Locations</h2>
        {currentCity && coords && (
          <button
            className={`${styles.saveBtn} ${isSaved ? styles.saved : ''}`}
            onClick={isSaved ? () => onRemove({ ...currentCity, ...coords }) : onAdd}
          >
            {isSaved ? 'Saved' : 'Save Location'}
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No saved locations yet.</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((fav) => (
            <li
              key={`${fav.lat}-${fav.lon}`}
              className={styles.item}
              onClick={() => onSelect(fav)}
            >
              <span className={styles.name}>
                {fav.name}, {fav.country}
              </span>
              <button
                className={styles.remove}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(fav);
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
