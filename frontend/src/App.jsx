import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing'; // adjust the path to your Landing component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Add your other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;