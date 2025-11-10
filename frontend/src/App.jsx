import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import HobbyCard from './components/HobbyCard';
import EventCard from './components/EventCard';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HobbyDetail from './pages/HobbyDetail';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hobby/:id" element={<HobbyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
