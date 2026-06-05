import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SitePage } from "./SitePage";
import ShowcasePage from "./showcase/ShowcasePage";

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route path="/" element={<SitePage />} />
        <Route path="/showcase/*" element={<ShowcasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
