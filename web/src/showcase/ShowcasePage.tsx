import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import styles from "./ShowcasePage.module.css";
import {
  getShowcasePages,
  showcaseRoutes,
  type ShowcaseGroup,
  type ShowcasePageConfig,
  type ShowcaseSubgroup,
} from "./routes";

function navLinkClassName(isActive: boolean) {
  return isActive
    ? `${styles.navLink} ${styles.navLinkActive}`
    : styles.navLink;
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

function ShowcaseNavSubgroup({ subgroup }: { subgroup: ShowcaseSubgroup }) {
  return (
    <div className={styles.subgroup}>
      <p className={styles.subgroupLabel}>{subgroup.label}</p>
      <ShowcaseNavPages pages={subgroup.pages} />
    </div>
  );
}

function ShowcaseNavGroup({ group }: { group: ShowcaseGroup }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{group.label}</p>
      {group.comingSoon ? (
        <p className={styles.comingSoon}>Скоро</p>
      ) : null}
      {group.groups?.map((subgroup) => (
        <ShowcaseNavSubgroup key={subgroup.id} subgroup={subgroup} />
      ))}
      {group.pages ? <ShowcaseNavPages pages={group.pages} /> : null}
    </div>
  );
}

export default function ShowcasePage() {
  const pages = getShowcasePages();

  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <h1 className={styles.brand}>Prytula DS</h1>
        <nav className={styles.nav} aria-label="Design system">
          {showcaseRoutes.map((group) => (
            <ShowcaseNavGroup key={group.id} group={group} />
          ))}
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
