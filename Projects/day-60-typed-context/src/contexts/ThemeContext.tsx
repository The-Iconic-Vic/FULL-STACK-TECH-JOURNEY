import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isSystemPreference: boolean;
  useSystemPreference: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPreference(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return null;
  } catch {
    return null;
  }
}

function saveTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isSystemPreference, setIsSystemPreference] = useState(true);

  useEffect(() => {
    const stored = loadStoredTheme();
    if (stored) {
      setThemeState(stored);
      setIsSystemPreference(false);
    } else {
      setThemeState(getSystemPreference());
      setIsSystemPreference(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    setIsSystemPreference(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    saveTheme(newTheme);
    setIsSystemPreference(false);
  };

  const useSystemPreference = () => {
    const systemTheme = getSystemPreference();
    setThemeState(systemTheme);
    setIsSystemPreference(true);
    localStorage.removeItem('theme');
  };

  const value: ThemeContextValue = {
    theme,
    toggleTheme,
    setTheme,
    isSystemPreference,
    useSystemPreference,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeProvider, useTheme };