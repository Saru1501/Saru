import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Invoice System</h1>
        </div>
        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${isActive('/')}`}>
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link to="/products" className={`navbar-link ${isActive('/products')}`}>
            <i className="fas fa-box"></i> Products
          </Link>
          <Link to="/invoices" className={`navbar-link ${isActive('/invoices')}`}>
            <i className="fas fa-file-invoice"></i> Invoices
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;