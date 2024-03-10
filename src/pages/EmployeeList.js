// EmployeeList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const handleEditClick = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  useEffect(() => {
    // Fetch employees from backend API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee/get");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employee/delete/${id}`);
      // Remove the deleted employee from the state
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="employee-list-container">
        <div className="header">
          <h2>Employee List</h2>
          <div className="controls">
            <p>Total: {employees.length}</p>
            <Link to="/employees/create">
              <button>Create Employee</button>
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>gender</th>
              <th>Course</th>
              <th>Create date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{new Date(employee.Createdate).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex" }}>
                  <button onClick={() => handleEditClick(employee.id)}>Edit</button>
                    <button onClick={() => handleDelete(employee._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
