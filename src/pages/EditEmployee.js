import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Import Navbar component
import { useParams,useNavigate } from 'react-router-dom';


const EmployeeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    img: ''
  });

  useEffect(() => {
    // Fetch employee data from backend API
    const fetchEmployee = async () => {
        console.log(`http://localhost:5000/employee/getone/${id}`)
      try {
        const response = await axios.get(`http://localhost:5000/employee/getone/${id}`);
        const fetchedEmployee = response.data; // Assuming API returns data in the format { name, email, mobile, designation, gender, course, img }
        setEmployee(fetchedEmployee);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, img: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  
    try {
        await axios.put(`http://localhost:5000/employee/update/${id}`, {
            name: employee.name,
            email: employee.email,
            mobile: employee.mobile,
            designation: employee.designation,
            gender: employee.gender,
            course: employee.course,
            img: employee.img
        });
        // Navigate to employee list after successful update
        navigate('/employees');
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    
  };

  return (
    <div>
      <Navbar /> {/* Include Navbar component */}
      <h2>Employee Edit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={employee.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        </div>
        <div>
          <label>Course:</label>
          <label><input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA</label>
          <label><input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA</label>
          <label><input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC</label>
        </div>
        <div>
          <label>Image Upload:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
