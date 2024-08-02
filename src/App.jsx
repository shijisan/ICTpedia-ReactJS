import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './assets/pages/Homepage';
import WikiResults from './assets/pages/Wiki-Results';
import WikiSearchPage from './assets/pages/WikiSearchPage.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/wiki-search/" element={<WikiSearchPage />} />
        <Route path="/wiki-results/:keyword" element={<WikiResults />} />
      </Routes>
    </Router>
  );
}

export default App;
