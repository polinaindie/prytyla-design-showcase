import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ShowcaseThemeMode } from "./showcase.types";

type ShowcaseThemeContextValue = {
  theme: ShowcaseThemeMode;
  setTheme: (theme: ShowcaseThemeMode) => void;
  toggleTheme: () => void;
};

const ShowcaseThemeContext = createContext<ShowcaseThemeContextValue | null>(null);

type ShowcaseThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ShowcaseThemeMode;
};

export function ShowcaseThemeProvider({
  children,
  defaultTheme = "light",
}: ShowcaseThemeProviderProps) {
  const [theme, setTheme] = useState<ShowcaseThemeMode>(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ShowcaseThemeContext.Provider value={value}>{children}</ShowcaseThemeContext.Provider>
  );
}

export function useShowcaseTheme(): ShowcaseThemeContextValue {
  const ctx = useContext(ShowcaseThemeContext);
  if (!ctx) {
    throw new Error("useShowcaseTheme must be used within ShowcaseThemeProvider");
  }
  return ctx;
}

/** Optional hook when theme provider is not mounted */
export function useShowcaseThemeOptional(): ShowcaseThemeContextValue | null {
  return useContext(ShowcaseThemeContext);
}
