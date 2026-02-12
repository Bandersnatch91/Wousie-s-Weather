import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className={styles.banner}>
      <p>{message}</p>
      {onDismiss && (
        <button className={styles.dismiss} onClick={onDismiss}>
          &times;
        </button>
      )}
    </div>
  );
}
