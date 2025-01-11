import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/register/customer'); // Navigate back to the registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Customer Dashboard</h1>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
