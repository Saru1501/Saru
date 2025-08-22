import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InvoiceForm.css';
import { createInvoice } from '../api/invoiceApi';

function AddInvoice() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !amount || !dueDate) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const invoiceData = {
        title,
        description,
        amount: parseFloat(amount),
        dueDate
      };
      
      await createInvoice(invoiceData);
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/invoices');
      }, 2000);
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError(err.response?.data?.message || 'Failed to create invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="invoice-form-container">
      <h1 className="page-title">Add Invoice</h1>
      
      <div className="card">
        <div className="card-header">
          <h2>Add Invoice</h2>
        </div>
        <div className="card-content">
          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i>
              Invoice created successfully
            </div>
          )}
          
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter invoice title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter invoice description"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter invoice amount"
                required
              />
            </div>
            
            ?
            
            <div className="form-submit">
              <button 
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;