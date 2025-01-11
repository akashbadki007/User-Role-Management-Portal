import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterCustomer from "./Components/RegisterCustomer";
import CustomerDashboard from "./Components/CustomerDashboard";
import RegisterAdmin from "./Components/RegisterAdmin";
import AdminDashboard from "./Components/AdminDashboard";
import Navbar from './components/Navbar';
import AdminLogin from './Components/AdminLogin';
import AdminLoginDashboard from './Components/AdminLoginDashboard';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
        <Route path="/" element={<div className='text-center text-orange-800 font-bold text-[45px] mt-[250px]'>Welcome to MyApp</div>} /> {/* Home route */}
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/register/admin" element={<RegisterAdmin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/login" element={<AdminLogin />} /> Correct route path */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
            <ProtectedRoute>
              <AdminLoginDashboard />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
