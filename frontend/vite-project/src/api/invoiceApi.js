import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all invoices
export const getInvoices = async () => {
  const response = await axios.get(`${API_URL}/invoices`);
  return response.data;
};

// Get single invoice
export const getInvoice = async (id) => {
  const response = await axios.get(`${API_URL}/invoices/${id}`);
  return response.data;
};

// Create new invoice
export const createInvoice = async (invoiceData) => {
  const response = await axios.post(`${API_URL}/invoices`, invoiceData);
  return response.data;
};

// Update invoice
export const updateInvoice = async (id, invoiceData) => {
  const response = await axios.put(`${API_URL}/invoices/${id}`, invoiceData);
  return response.data;
};

// Delete invoice
export const deleteInvoice = async (id) => {
  const response = await axios.delete(`${API_URL}/invoices/${id}`);
  return response.data;
}; 