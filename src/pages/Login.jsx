import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Access setUser function from UserContext
  const [data, setData] = useState({ f_userName: '', f_Pwd: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!data.f_userName || !data.f_Pwd) {
      
      window.alert('Username and password are required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        f_userName: data.f_userName,
        f_Pwd: data.f_Pwd
      });
      const { success, message, username: loggedInUsername } = response.data;
      if (success) {
        localStorage.setItem('username', loggedInUsername);
        const storedUser = localStorage.getItem('username');
        setUser(storedUser);
        console.log(message);
        navigate('/dashboard');
        // Redirect to dashboard or perform any other action
      } else {
        window.alert(message);
        
        // Handle invalid credentials
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      window.alert(error.response.data.message);
      setData({ f_userName: '', f_Pwd: '' });
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={data.f_userName} onChange={(e) => setData({ ...data, f_userName: e.target.value })} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={data.f_Pwd} onChange={(e) => setData({ ...data, f_Pwd: e.target.value })} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>for testing purpose use vinay and password1 as username and password</p>
    </div>
  );
};

export default Login;
