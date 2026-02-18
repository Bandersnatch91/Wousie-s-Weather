import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wousie-settings';

const DEFAULTS = {
  bgColor: '#e8eef5',
  accentColor: '#3b82f6',
  darkMode: false,
  fontSize: 'medium',
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULTS };
}

export function useSettings() {
  const [settings, setSettings] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({ ...DEFAULTS });
  };

  return { settings, updateSetting, resetSettings };
}
