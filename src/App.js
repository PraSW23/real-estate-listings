// src/App.js
import {React, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import UserDashboard from './pages/UserDashboard';
import { loadUser } from './actions/authActions';
import { useDispatch } from 'react-redux';
import UserProfile from './pages/Profile';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
        <Route path="/Profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;