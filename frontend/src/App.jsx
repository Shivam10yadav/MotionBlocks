import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'; // adjust the path to your Landing component
import Components from './pages/components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/components" element={<Components />} />
        {/* Add your other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;