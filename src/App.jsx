import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TemplePage from './pages/TemplePage';
import DonationHistory from './pages/DonationHistory';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/temple" element={<TemplePage />} />
        <Route path="/donation-history" element={<DonationHistory />} />
      </Routes>
    </Router>
  );
}

export default App;