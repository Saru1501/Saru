import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-header">
            <h2><i className="fas fa-box"></i> Products Management</h2>
            <p>Manage your products, add new ones, and track inventory</p>
          </div>
          <div className="card-content">
            <p>Add, edit, and remove products. Calculate totals and generate PDF reports.</p>
            <Link to="/products" className="btn btn-primary">
              Go to Products
            </Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h2><i className="fas fa-file-invoice"></i> Invoices Management</h2>
            <p>Create and manage invoices for your clients</p>
          </div>
          <div className="card-content">
            <p>Create new invoices, view existing ones, and track payment status.</p>
            <div className="button-group">
              <Link to="/invoices" className="btn btn-primary">
                View Invoices
              </Link>
              <Link to="/invoices/add" className="btn btn-outline">
                <i className="fas fa-plus-circle"></i> Create New Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;