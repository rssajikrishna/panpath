import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClinicalLayout from './components/Layout/ClinicalLayout';
import Home from './pages/Home';
import ClinicalDashboard from './pages/ClinicalDashboard';
import EventDetail from './pages/EventDetail';
import Alerts from './pages/Alerts';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <ClinicalLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ClinicalDashboard />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ClinicalLayout>
    </Router>
  );
}

export default App;