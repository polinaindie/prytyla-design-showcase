import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { IconSearch } from "../design-system/Icons";
import {
  searchPlaceholderForPath,
  ShowcaseSearchProvider,
  useShowcaseSearch,
} from "./ShowcaseSearchContext";
import { ShowcaseViewportProvider } from "./ShowcaseViewportContext";
import styles from "./ShowcasePage.module.css";
import {
  getShowcasePages,
  showcaseRoutes,
  type ShowcaseGroup,
  type ShowcasePageConfig,
  type ShowcaseSubgroup,
} from "./routes";

function pageMatchesQuery(page: ShowcasePageConfig, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    page.label.toLowerCase().includes(q) ||
    page.path.toLowerCase().includes(q) ||
    page.id.toLowerCase().includes(q)
  );
}

function filterSubgroupPages(
  subgroup: ShowcaseSubgroup,
  query: string,
): ShowcaseSubgroup | null {
  if (subgroup.comingSoon) return null;
  const pages = subgroup.pages.filter((page) => pageMatchesQuery(page, query));
  if (pages.length === 0) return null;
  return { ...subgroup, pages };
}

function filterShowcaseRoutes(
  routes: ShowcaseGroup[],
  query: string,
): ShowcaseGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return routes;

  const result: ShowcaseGroup[] = [];

  for (const group of routes) {
    if (group.comingSoon) continue;

    const directPages = group.pages?.filter((page) => pageMatchesQuery(page, q));
    const subgroups = group.groups
      ?.map((sub) => filterSubgroupPages(sub, q))
      .filter((sub): sub is ShowcaseSubgroup => sub !== null);

    if ((directPages?.length ?? 0) === 0 && (subgroups?.length ?? 0) === 0) {
      continue;
    }

    result.push({
      ...group,
      pages: directPages,
      groups: subgroups,
    });
  }

  return result;
}

function navLinkClassName(isActive: boolean) {
  return isActive
    ? `${styles.navLink} ${styles.navLinkActive}`
    : styles.navLink;
}

function subgroupSectionId(groupId: string, subgroupId: string) {
  return `${groupId}:${subgroupId}`;
}

function getExpandedIdsForPath(pathSegment: string): Set<string> {
  const ids = new Set<string>();

  for (const group of showcaseRoutes) {
    if (group.pages?.some((page) => page.path === pathSegment)) {
      ids.add(group.id);
    }

    for (const subgroup of group.groups ?? []) {
      if (subgroup.pages.some((page) => page.path === pathSegment)) {
        ids.add(group.id);
        ids.add(subgroupSectionId(group.id, subgroup.id));
      }
    }
  }

  return ids;
}

function ShowcaseNavPages({ pages }: { pages: ShowcasePageConfig[] }) {
  return (
    <ul className={styles.navList}>
      {pages.map((page) => (
        <li key={page.id}>
          <NavLink
            to={`/showcase/${page.path}`}
            className={({ isActive }) => navLinkClassName(isActive)}
          >
            {page.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

type NavDisclosureProps = {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  level: "group" | "subgroup";
  children: ReactNode;
};

function NavDisclosure({
  id,
  label,
  expanded,
  onToggle,
  level,
  children,
}: NavDisclosureProps) {
  return (
    <div
      className={
        level === "group" ? styles.disclosureGroup : styles.disclosureSubgroup
      }
    >
      <button
        type="button"
        className={
          level === "group"
            ? styles.disclosureButton
            : styles.disclosureButtonSubgroup
        }
        aria-expanded={expanded}
        onClick={() => onToggle(id)}
      >
        <span
          className={
            expanded ? styles.chevronExpanded : styles.chevronCollapsed
          }
          aria-hidden
        />
        {label}
      </button>
      {expanded ? <div className={styles.disclosurePanel}>{children}</div> : null}
    </div>
  );
}

function ShowcaseNavSubgroup({
  groupId,
  subgroup,
  expanded,
  onToggle,
}: {
  groupId: string;
  subgroup: ShowcaseSubgroup;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const sectionId = subgroupSectionId(groupId, subgroup.id);

  if (subgroup.comingSoon) {
    return (
      <NavDisclosure
        id={sectionId}
        label={subgroup.label}
        expanded={expanded}
        onToggle={onToggle}
        level="subgroup"
      >
        <p className={styles.comingSoon}>Скоро</p>
      </NavDisclosure>
    );
  }

  if (subgroup.pages.length === 0) {
    return (
      <NavDisclosure
        id={sectionId}
        label={subgroup.label}
        expanded={expanded}
        onToggle={onToggle}
        level="subgroup"
      >
        <p className={styles.comingSoon}>Скоро</p>
      </NavDisclosure>
    );
  }

  return (
    <NavDisclosure
      id={sectionId}
      label={subgroup.label}
      expanded={expanded}
      onToggle={onToggle}
      level="subgroup"
    >
      <ShowcaseNavPages pages={subgroup.pages} />
    </NavDisclosure>
  );
}

function ShowcaseNavGroup({
  group,
  expanded,
  expandedSubgroups,
  onToggleGroup,
  onToggleSubgroup,
}: {
  group: ShowcaseGroup;
  expanded: boolean;
  expandedSubgroups: Set<string>;
  onToggleGroup: (id: string) => void;
  onToggleSubgroup: (id: string) => void;
}) {
  return (
    <NavDisclosure
      id={group.id}
      label={group.label}
      expanded={expanded}
      onToggle={onToggleGroup}
      level="group"
    >
      {group.comingSoon ? <p className={styles.comingSoon}>Скоро</p> : null}
      {group.groups?.map((subgroup) => (
        <ShowcaseNavSubgroup
          key={subgroup.id}
          groupId={group.id}
          subgroup={subgroup}
          expanded={expandedSubgroups.has(subgroupSectionId(group.id, subgroup.id))}
          onToggle={onToggleSubgroup}
        />
      ))}
      {group.pages ? <ShowcaseNavPages pages={group.pages} /> : null}
    </NavDisclosure>
  );
}

function ShowcaseSidebarSearch({ activePath }: { activePath: string }) {
  const { query, setQuery } = useShowcaseSearch();

  return (
    <div className={styles.searchWrap}>
      <span className={styles.searchIcon} aria-hidden>
        <IconSearch size={20} />
      </span>
      <input
        type="search"
        className={styles.search}
        placeholder={searchPlaceholderForPath(activePath)}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label={searchPlaceholderForPath(activePath)}
      />
    </div>
  );
}

function ShowcaseLayout() {
  const pages = getShowcasePages();
  const location = useLocation();
  const { query, setQuery } = useShowcaseSearch();

  const activePath = useMemo(() => {
    const match = location.pathname.match(/\/showcase\/([^/]+)/);
    return match?.[1] ?? "colors";
  }, [location.pathname]);

  const navRoutes = useMemo(
    () => filterShowcaseRoutes(showcaseRoutes, query),
    [query],
  );

  const searchActive = query.trim().length > 0;

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() =>
    getExpandedIdsForPath(activePath),
  );
  const [expandedSubgroups, setExpandedSubgroups] = useState<Set<string>>(() =>
    getExpandedIdsForPath(activePath),
  );

  useEffect(() => {
    setQuery("");
    const ids = getExpandedIdsForPath(activePath);
    setExpandedGroups((prev) => new Set([...prev, ...ids]));
    setExpandedSubgroups((prev) => new Set([...prev, ...ids]));
  }, [activePath, setQuery]);

  useEffect(() => {
    if (!searchActive) return;
    const ids = new Set<string>();
    for (const group of navRoutes) {
      ids.add(group.id);
      for (const subgroup of group.groups ?? []) {
        ids.add(subgroupSectionId(group.id, subgroup.id));
      }
    }
    setExpandedGroups((prev) => new Set([...prev, ...ids]));
    setExpandedSubgroups((prev) => new Set([...prev, ...ids]));
  }, [searchActive, navRoutes]);

  const toggleGroup = useCallback((id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleSubgroup = useCallback((id: string) => {
    setExpandedSubgroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <h1 className={styles.brand}>Prytula DS</h1>
        <ShowcaseSidebarSearch activePath={activePath} />
        <nav className={styles.nav} aria-label="Design system">
          {navRoutes.length > 0 ? (
            navRoutes.map((group) => (
              <ShowcaseNavGroup
                key={group.id}
                group={group}
                expanded={expandedGroups.has(group.id)}
                expandedSubgroups={expandedSubgroups}
                onToggleGroup={toggleGroup}
                onToggleSubgroup={toggleSubgroup}
              />
            ))
          ) : (
            <p className={styles.searchEmpty}>Нічого не знайдено</p>
          )}
        </nav>
      </aside>

      <main className={styles.main}>
        <Routes>
          <Route index element={<Navigate to="colors" replace />} />
          {pages.map((page) => (
            <Route
              key={page.id}
              path={page.path}
              element={<page.Component />}
            />
          ))}
          <Route path="*" element={<Navigate to="colors" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <ShowcaseSearchProvider>
      <ShowcaseViewportProvider>
        <ShowcaseLayout />
      </ShowcaseViewportProvider>
    </ShowcaseSearchProvider>
  );
}
