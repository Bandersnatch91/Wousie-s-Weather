import { useState, useRef, useEffect } from 'react';
import styles from './Settings.module.css';

export default function Settings({ settings, units, onUpdate, onToggleUnits, onReset }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={styles.wrapper}>
      <button
        ref={btnRef}
        className={styles.gearBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <div ref={panelRef} className={styles.panel}>
          <h3 className={styles.panelTitle}>Settings</h3>

          {/* Units */}
          <div className={styles.row}>
            <span className={styles.label}>Units</span>
            <div className={styles.radioGroup}>
              <label className={`${styles.radio} ${units === 'imperial' ? styles.radioActive : ''}`}>
                <input
                  type="radio"
                  name="units"
                  checked={units === 'imperial'}
                  onChange={() => units !== 'imperial' && onToggleUnits()}
                />
                °F
              </label>
              <label className={`${styles.radio} ${units === 'metric' ? styles.radioActive : ''}`}>
                <input
                  type="radio"
                  name="units"
                  checked={units === 'metric'}
                  onChange={() => units !== 'metric' && onToggleUnits()}
                />
                °C
              </label>
            </div>
          </div>

          {/* Dark Mode */}
          <div className={styles.row}>
            <span className={styles.label}>Dark Mode</span>
            <button
              className={`${styles.toggle} ${settings.darkMode ? styles.toggleOn : ''}`}
              onClick={() => onUpdate('darkMode', !settings.darkMode)}
              role="switch"
              aria-checked={settings.darkMode}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>

          {/* Background Color */}
          <div className={styles.row}>
            <span className={styles.label}>Background</span>
            <input
              type="color"
              className={styles.colorPicker}
              value={settings.darkMode ? '#0f172a' : settings.bgColor}
              disabled={settings.darkMode}
              onChange={(e) => onUpdate('bgColor', e.target.value)}
            />
          </div>

          {/* Accent Color */}
          <div className={styles.row}>
            <span className={styles.label}>Accent</span>
            <input
              type="color"
              className={styles.colorPicker}
              value={settings.accentColor}
              onChange={(e) => onUpdate('accentColor', e.target.value)}
            />
          </div>

          {/* Font Size */}
          <div className={styles.row}>
            <span className={styles.label}>Font Size</span>
            <div className={styles.radioGroup}>
              {['small', 'medium', 'large'].map((size) => (
                <label
                  key={size}
                  className={`${styles.radio} ${settings.fontSize === size ? styles.radioActive : ''}`}
                >
                  <input
                    type="radio"
                    name="fontSize"
                    checked={settings.fontSize === size}
                    onChange={() => onUpdate('fontSize', size)}
                  />
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button className={styles.resetBtn} onClick={onReset}>
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}
