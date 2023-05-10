import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import WeightsPage from './pages/Weights';
import ReservationsPage from './pages/Reservations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<HomePage/>}/>
        <Route path='/weights' exact element={<WeightsPage/>}/>
        <Route path='/reservations' exact element={<ReservationsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
