import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef } from "react";

import Landing from "./pages/landing/Landing";
import Components from "./pages/components";
import ComponentDetails from "./localcomponents/ComponentsDetails";
import DocsPage from "./pages/DocsPage";
import ContributePage from "./pages/Contribute";
import NotFound from "./localcomponents/NotFound";
import ScrollToTop from "./localcomponents/ScrollToTop";
import LogosPage from "./pages/LogosPage";
import { Popup } from "./localcomponents/Popup";
import PageTransition from "./localcomponents/PageTransition";
import FontsPage from "./pages/FontsPage";
import ColorPalettesPage from "./pages/ColorPalletesPage";
import BackgroundGraidentGenerator from "./pages/BackgroundGradientGenerator";

function AppContent() {
  const navigate = useNavigate();
  const tearRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // Only handle normal left-clicks
      if (event.button !== 0) return;

      // Ignore modifier clicks
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // Find the clicked link
      const link = event.target.closest("a");

      if (!link) return;

      // Ignore links that shouldn't use the transition
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("href")?.startsWith("mailto:") ||
        link.getAttribute("href")?.startsWith("tel:")
      ) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) return;

      // Create URL from the clicked link
      const url = new URL(href, window.location.origin);

      // Ignore external links
      if (url.origin !== window.location.origin) {
        return;
      }

      // Ignore same-page links
      const currentUrl =
        window.location.pathname +
        window.location.search +
        window.location.hash;

      const targetUrl =
        url.pathname +
        url.search +
        url.hash;

      if (currentUrl === targetUrl) {
        return;
      }

      // Stop React Router's normal navigation
      event.preventDefault();

      // Start transition
      tearRef.current?.play(() => {
        navigate(targetUrl);
      });
    };

    // Capture phase so we catch the click before React Router
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [navigate]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/components"
          element={<Components />}
        />

        <Route
          path="/docs"
          element={<DocsPage />}
        />

        <Route
          path="/contribute"
          element={<ContributePage />}
        />

        <Route
          path="/components/:category/:slug"
          element={<ComponentDetails />}
        />

        <Route
          path="/logo"
          element={<LogosPage />}
        />

                <Route
          path="/fonts"
          element={<FontsPage />}

          
        />

                <Route
          path="/gradients"
          element={<BackgroundGraidentGenerator />}

          
        />


                <Route
          path="/colors"
          element={<ColorPalettesPage />}

          
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <PageTransition ref={tearRef} />

      <Popup
        githubUrl="https://github.com/Shivam10yadav/Motion-blocks"
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;