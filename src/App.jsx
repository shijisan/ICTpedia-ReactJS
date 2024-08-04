// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Homepage from './assets/pages/Homepage';
import WikiResults from './assets/pages/Wiki-Results';
import WikiSearchPage from './assets/pages/WikiSearchPage.jsx';
import Register from './assets/pages/Register.jsx';
import Login from './assets/pages/Login.jsx';
import Profile from './assets/pages/Profile.jsx';
import AdminPage from './assets/pages/AdminPage.jsx';
import AdminProtectedRoute from './assets/components/AdminProtectedRoute.jsx';
import AdminLogin from './assets/pages/AdminLogin.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/wiki-search/" element={<WikiSearchPage />} />
        <Route path="/wiki-results/:keyword" element={<WikiResults />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/profile/" element={<Profile />} />
        {/* Use AdminProtectedRoute for admin pages */}
        <Route
          path="/admin/dashboard"
          element={<AdminProtectedRoute element={<AdminPage />} />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
