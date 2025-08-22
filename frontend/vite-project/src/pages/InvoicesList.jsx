import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/InvoicesList.css';

function InvoicesList() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch invoices from your backend API
    const fetchInvoices = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('your-api-endpoint/invoices');
        // const data = await response.json();
        // setInvoices(data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setInvoices([
            {
              id: 1,
              title: "hard disc final",
              description: "nice hard disc to use",
              amount: 1500,
              dueDate: "12/5/2024"
            },
            {
              id: 2,
              title: "ssd",
              description: "ssd nice one",
              amount: 3000,
              dueDate: "12/5/2024"
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDeleteInvoice = async (id) => {
    try {
      // Replace with your actual API endpoint
      // await fetch(`your-api-endpoint/invoices/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Update local state
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className="invoices-list">
      <div className="page-header">
        <h1 className="page-title">Invoices</h1>
        <Link to="/invoices/add" className="btn btn-primary">
          <i className="fas fa-plus-circle"></i> Add Invoice
        </Link>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2>Invoices List</h2>
        </div>
        <div className="card-content">
          {loading ? (
            <div className="loading">Loading invoices...</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id}>
                      <td>{index + 1}</td>
                      <td>{invoice.title}</td>
                      <td>{invoice.description}</td>
                      <td>${invoice.amount}</td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-edit"
                            onClick={() => navigate(`/invoices/edit/${invoice.id}`)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-delete"
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">No invoices found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoicesList;