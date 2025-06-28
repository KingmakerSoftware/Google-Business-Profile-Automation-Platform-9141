import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleAuthProvider } from './contexts/GoogleAuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BusinessProfiles from './pages/BusinessProfiles';
import './App.css';

function App() {
  return (
    <GoogleAuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profiles" element={<BusinessProfiles />} />
          </Routes>
        </Layout>
      </Router>
    </GoogleAuthProvider>
  );
}

export default App;