import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  typographyModeForWidth,
  type ShowcaseTypographyMode,
} from "./showcaseTypography";

export const SHOWCASE_VIEWPORTS = [
  { id: "1920", label: "1920", width: 1920 },
  { id: "1440", label: "1440", width: 1440 },
  { id: "1200", label: "1200", width: 1200 },
  { id: "768", label: "768", width: 768 },
  { id: "375", label: "375", width: 375 },
] as const;

export type ShowcaseViewportId = (typeof SHOWCASE_VIEWPORTS)[number]["id"];

type ShowcaseViewportContextValue = {
  viewportId: ShowcaseViewportId;
  viewportWidth: number;
  typographyMode: ShowcaseTypographyMode;
  setViewportId: (id: ShowcaseViewportId) => void;
};

const ShowcaseViewportContext = createContext<ShowcaseViewportContextValue | null>(
  null,
);

export function ShowcaseViewportProvider({ children }: { children: ReactNode }) {
  const [viewportId, setViewportIdState] = useState<ShowcaseViewportId>("1440");

  const setViewportId = useCallback((id: ShowcaseViewportId) => {
    setViewportIdState(id);
  }, []);

  const viewportWidth = useMemo(
    () => SHOWCASE_VIEWPORTS.find((item) => item.id === viewportId)?.width ?? 1440,
    [viewportId],
  );

  const typographyMode = useMemo(
    () => typographyModeForWidth(viewportWidth),
    [viewportWidth],
  );

  const value = useMemo(
    () => ({ viewportId, viewportWidth, typographyMode, setViewportId }),
    [viewportId, viewportWidth, typographyMode, setViewportId],
  );

  return (
    <ShowcaseViewportContext.Provider value={value}>
      {children}
    </ShowcaseViewportContext.Provider>
  );
}

export function useShowcaseViewport(): ShowcaseViewportContextValue {
  const ctx = useContext(ShowcaseViewportContext);
  if (!ctx) {
    throw new Error(
      "useShowcaseViewport must be used within ShowcaseViewportProvider",
    );
  }
  return ctx;
}
