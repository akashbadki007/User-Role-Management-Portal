import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login/admin', formData);
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token); // Save token to localStorage
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'You are not allowed to login from here. Only Admin login is allowed.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded transition duration-300 ${
            loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
