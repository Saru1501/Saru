const API_URL = import.meta.env.VITE_API_URL;

// Invoice API calls
export const fetchInvoices = async () => {
  const response = await fetch(`${API_URL}/invoices`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return response.json();
};

export const fetchInvoice = async (id) => {
  const response = await fetch(`${API_URL}/invoices/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoice');
  }
  return response.json();
};

export const createInvoice = async (invoiceData) => {
  const response = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });
  if (!response.ok) {
    throw new Error('Failed to create invoice');
  }
  return response.json();
};

export const updateInvoice = async (id, invoiceData) => {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });
  if (!response.ok) {
    throw new Error('Failed to update invoice');
  }
  return response.json();
};

export const deleteInvoice = async (id) => {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete invoice');
  }
  return response.json();
};

// Product API calls
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return response.json();
};