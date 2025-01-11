import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCustomer = () => {
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

    try {
      await axios.post('http://localhost:3000/api/v1/register/customer', formData);
      navigate('/dashboard'); // Navigate to the customer dashboard
    } catch (error) {
      if (error.response?.data?.msg === 'Email already exists') {
        setFieldErrors({ ...fieldErrors, email: 'Email already exists' });
      } else {
        setError(error.response?.data?.msg || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center mb-4">Customer Registration</h2>
      {error && <p className="text-red-500 text-center mr-6 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`w-full p-2 border ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`w-full p-2 border ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-2 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-2 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterCustomer;

