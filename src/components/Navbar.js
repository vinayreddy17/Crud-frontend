import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const handleLogout = () => {
        localStorage.removeItem('username');
        setUser(null); 
        navigate('/'); 
      };
  return (
    <div className="navbar"> 
      <div className="left-buttons"> 
        <Link to="/" className="button">Home</Link>
        <Link to="/employees" className="button">Employee List</Link> 
      </div>
      <div className="right-buttons"> 
      {user && <span className="username">{user}</span>} 
        <button className="logout-button" onClick={handleLogout}>Logout</button> 
      </div>
    </div>
  );
};

export default Navbar;
