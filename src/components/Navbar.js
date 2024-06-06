// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loadUser } from '../actions/authActions';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useNavigate(); 

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(loadUser()); // Load user information
    }
  }, [isAuthenticated, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    history('/'); // Redirect to Home page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Property Management System</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            {user && <div>Hi {user.name}!</div>} 
            <Link to="/UserDashboard">Dashboard</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/SignUp">Sign Up</Link>
            <Link to="/Login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
