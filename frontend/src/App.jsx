import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'; // adjust the path to your Landing component
import Components from './pages/components';
import ComponentDetails from './localcomponents/ComponentsDetails';
import DocsPage from './pages/DocsPage';
import ContributePage from './pages/Contribute';

function App() {
  return (
    <BrowserRouter>
  <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/components" element={<Components />} />
  <Route path="/docs" element={<DocsPage />} />
  <Route path="/contribute" element={<ContributePage />} />
  <Route
    path="/components/:category/:slug"
    element={<ComponentDetails />}
  />
</Routes>
    </BrowserRouter>
  );
}


// forced commment for commit 

export default App;