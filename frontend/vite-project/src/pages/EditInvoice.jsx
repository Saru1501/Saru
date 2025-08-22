import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/InvoiceForm.css';

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch(`your-api-endpoint/invoices/${id}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch invoice');
        // }
        // const data = await response.json();
        // setTitle(data.title);
        // setDescription(data.description);
        // setAmount(data.amount.toString());
        // setDueDate(data.dueDate);
        
        // Simulate API call with mock data
        setTimeout(() => {
          // Mock data based on ID
          const mockData = {
            title: id === "1" ? "hard disc final" : "ssd",
            description: id === "1" ? "nice hard disc to use" : "ssd nice one",
            amount: id === "1" ? "1500" : "3000",
            dueDate: "2024-05-12" // Format for input type="date"
          };
          
          setTitle(mockData.title);
          setDescription(mockData.description);
          setAmount(mockData.amount);
          setDueDate(mockData.dueDate);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setError('Failed to load invoice data');
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

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
      // Replace with your actual API endpoint
      // const response = await fetch(`your-api-endpoint/invoices/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     title,
      //     description,
      //     amount: parseFloat(amount),
      //     dueDate
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update invoice');
      // }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/invoices');
      }, 2000);
    } catch (err) {
      console.error('Error updating invoice:', err);
      setError('Failed to update invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        Loading invoice data...
      </div>
    );
  }

  return (
    <div className="invoice-form-container">
      <h1 className="page-title">Edit Invoice</h1>
      
      <div className="card">
        <div className="card-header">
          <h2>Edit Invoice</h2>
        </div>
        <div className="card-content">
          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i>
              Invoice updated successfully
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
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
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

export default EditInvoice;