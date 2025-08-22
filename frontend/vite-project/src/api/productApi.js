import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

// Create new product
export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

// Download products PDF
export const downloadProductsPDF = async () => {
  const response = await axios.get(`${API_URL}/products/pdf`, {
    responseType: 'blob'
  });
  
  // Create a blob from the PDF data
  const blob = new Blob([response.data], { type: 'application/pdf' });
  
  // Create a link element
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'products.pdf');
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}; 