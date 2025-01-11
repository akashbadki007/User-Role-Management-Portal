import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-white bg-blue-700 px-3 py-2 rounded-md'
      : 'text-white hover:bg-blue-700 px-3 py-2 rounded-md';
  };

  return (
    <nav className="bg-slate-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <Link to="/">MyApp</Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/register/customer" className={getLinkClass('/register/customer')}>
                Customer Register
              </Link>
            </li>
            <li>
              <Link to="/register/admin" className={getLinkClass('/register/admin')}>
                Admin Register
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className={getLinkClass('/admin/login')}>
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
