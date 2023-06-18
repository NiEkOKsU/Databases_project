import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import WeightsPage from './pages/Reservations';
import ReservationsPage from './pages/YourReservations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import './App.css';

function App() {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservations" element={<WeightsPage />} />
          <Route path="/reservations/yours" element={<ReservationsPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
