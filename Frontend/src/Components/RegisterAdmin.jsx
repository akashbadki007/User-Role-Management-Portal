import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' }); // Clear error when user changes the field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFieldErrors({
        firstName: !formData.firstName ? 'First name is required' : '',
        lastName: !formData.lastName ? 'Last name is required' : '',
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    // Adding role as "admin" to the formData before sending the request
    const dataToSend = { ...formData, role: 'admin' };

    try {
      // Send POST request to your backend for admin registration
      await axios.post('http://localhost:3000/api/v1/register/admin', dataToSend);
      // navigate('/admin-dashboard'); // Navigate to the admin dashboard after successful registration
      navigate('/admin/dashboard'); // Corrected path

    } catch (error) {
      if (error.response?.data?.msg === 'Email already exists') {
        setError('Email already exists. Please try another one.');
        setFieldErrors({ ...fieldErrors, email: 'Email already exists' });
      } else {
        setError(error.response?.data?.msg || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center mb-4">Admin Registration</h2>
      {error && <p className="text-red-500 text-center mr-6 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`w-full p-3 border ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.firstName && <p className="text-red-500 text-sm mt-1">{fieldErrors.firstName}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`w-full p-3 border ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.lastName && <p className="text-red-500 text-sm mt-1">{fieldErrors.lastName}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-3 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
