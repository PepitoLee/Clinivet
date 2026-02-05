import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDark: boolean;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  themeMode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'clinivet-theme';

function getPeruHour(): number {
  const now = new Date();
  const peruTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Lima' }));
  return peruTime.getHours();
}

function shouldBeDarkByTime(): boolean {
  const hour = getPeruHour();
  return hour >= 19 || hour < 6;
}

function getInitialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return shouldBeDarkByTime() ? 'dark' : 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);
  const [isManual, setIsManual] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  });

  const isDark = themeMode === 'dark';

  // Apply class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Auto-detect by Peru time (only if no manual override)
  useEffect(() => {
    if (isManual) return;

    const checkTime = () => {
      const autoTheme = shouldBeDarkByTime() ? 'dark' : 'light';
      setThemeMode(autoTheme);
    };

    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [isManual]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
    setIsManual(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
