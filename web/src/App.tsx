import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import ShowcasePage from "./showcase/ShowcasePage";
import { showcasePagePath } from "./showcase/showcasePaths";

function LegacyShowcaseRedirect() {
  const { "*": rest } = useParams();

  if (!rest) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={showcasePagePath(rest.split("/")[0])} replace />;
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route path="/showcase/*" element={<LegacyShowcaseRedirect />} />
        <Route path="/*" element={<ShowcasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
