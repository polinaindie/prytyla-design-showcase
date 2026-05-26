import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ShowcaseSearchContextValue = {
  query: string;
  setQuery: (query: string) => void;
};

const ShowcaseSearchContext = createContext<ShowcaseSearchContextValue | null>(
  null,
);

export function ShowcaseSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQueryState] = useState("");

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
  }, []);

  const value = useMemo(() => ({ query, setQuery }), [query, setQuery]);

  return (
    <ShowcaseSearchContext.Provider value={value}>
      {children}
    </ShowcaseSearchContext.Provider>
  );
}

export function useShowcaseSearch(): ShowcaseSearchContextValue {
  const ctx = useContext(ShowcaseSearchContext);
  if (!ctx) {
    throw new Error("useShowcaseSearch must be used within ShowcaseSearchProvider");
  }
  return ctx;
}

export function searchPlaceholderForPath(pathSegment: string): string {
  switch (pathSegment) {
    case "icons":
      return "Пошук іконки…";
    case "illustration-3d":
      return "Пошук варіанту…";
    case "colors":
    case "spacing":
    case "radius":
    case "typography":
      return "Пошук токена…";
    default:
      return "Пошук сторінки…";
  }
}
