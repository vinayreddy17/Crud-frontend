import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreateEmployee = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.post('http://localhost:5000/employee/create', formData);
      console.log('Employee created successfully:', response.data);
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        image: null,
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };
  

  return (
    <div>
        <Navbar />
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female</label>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
