import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SitePage } from "./SitePage";
import ShowcasePage from "./showcase/ShowcasePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SitePage />} />
        <Route path="/showcase/*" element={<ShowcasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
