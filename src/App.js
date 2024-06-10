// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/Profile';
import SavedProperties from './pages/SavedProperties';
import MyProperties from './pages/MyProperties';
import AddProperty from './pages/AddProperty';
import UpdateProperty from './pages/UpdateProperty';
import { loadUser } from './actions/authActions';
import NewProperties from './pages/NewProperties';
import SearchProperties from './pages/SearchProperties';

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
        <Route path="/SavedProperties" element={<SavedProperties />} />
        <Route path="/MyProperties" element={<MyProperties />} />
        <Route path="/AddProperty" element={<AddProperty />} />
        <Route path="/UpdateProperty/:id" element={<UpdateProperty />} />
        <Route path="/new-properties" element={<NewProperties />} />
        <Route path="/SearchProperties" element={<SearchProperties />} />
      </Routes>
    </Router>
  );
};

export default App;
