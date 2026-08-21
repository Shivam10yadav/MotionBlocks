import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Components from "./pages/components";
import ComponentDetails from "./localcomponents/ComponentsDetails";
import DocsPage from "./pages/DocsPage";
import ContributePage from "./pages/Contribute";
import NotFound from "./localcomponents/NotFound";
import ScrollToTop from "./localcomponents/ScrollToTop";
import LogosPage from "./pages/LogosPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/components" element={<Components />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route
          path="/components/:category/:slug"
          element={<ComponentDetails />}
        />
        <Route
          path="/logo"
          element={<LogosPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;