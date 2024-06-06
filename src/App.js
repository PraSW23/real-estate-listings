//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import UserDashboard from './pages/UserDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PropertyList" element={<PropertyList />} />
        <Route path="/PropertyDetails/:id" element={<PropertyDetails />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
