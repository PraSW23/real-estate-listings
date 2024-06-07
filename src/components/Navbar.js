// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loadUser } from '../actions/authActions';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(loadUser()); // Load user information
    }
  }, [isAuthenticated, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to Home page after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'New Properties', path: '/NewProperties' },
    { text: 'Search Properties', path: '/SearchProperties' },
  ];

  if (isAuthenticated) {
    menuItems.push(
      { text: 'My Properties', path: '/MyProperties' },
      { text: 'Saved Properties', path: '/SavedProperties' },
      { text: 'Profile', path: '/Profile' }
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Property Management System
            </Link>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <div
          role="presentation"
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
          style={{ width: 250 }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button component={Link} to={item.path} key={index}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Divider />
            {isAuthenticated ? (
              <>
                <ListItem button component={Link} to="/UserDashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/SignUp">
                  <ListItemText primary="Sign Up" />
                </ListItem>
                <ListItem button component={Link} to="/Login">
                  <ListItemText primary="Login" />
                </ListItem>
              </>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
