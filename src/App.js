import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext'; 
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';


// axios.defaults.baseURL = 'http://localhost:6000';
// axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <UserContextProvider> 
        
        
        <Router>
          <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
      </Router>
      </UserContextProvider> 
    </div>
  );
}

export default App;
