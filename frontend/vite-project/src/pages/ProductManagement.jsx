import React, { useState, useEffect } from 'react';
import '../styles/ProductManagement.css';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  downloadProductsPDF
} from '../api/productApi';

function ProductManagement() {
  // State for form inputs
  const [productDetails, setProductDetails] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  
  // State for products list
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Calculate grand total
  const grandTotal = products.reduce((sum, product) => sum + product.total + product.gst, 0);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (!productDetails || quantity <= 0 || unitPrice <= 0) {
      return; // Basic validation
    }
    
    try {
      const total = quantity * unitPrice;
      const gst = total * 0.18; // Assuming 18% GST
      
      const productData = {
        details: productDetails,
        quantity,
        unitPrice,
        total,
        gst
      };
      
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      
      // Reset form
      setProductDetails('');
      setQuantity(1);
      setUnitPrice(0);
      setError(null);
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    }
  };
  
  // Handle removing a product
  const handleRemoveProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to remove product');
      console.error('Error removing product:', err);
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const updatedQuantity = parseInt(newQuantity) || 0;
      const product = products.find(p => p._id === id);
      const total = updatedQuantity * product.unitPrice;
      
      const updatedProduct = await updateProduct(id, {
        quantity: updatedQuantity,
        total,
        gst: total * 0.18
      });
      
      setProducts(products.map(p => 
        p._id === id ? updatedProduct : p
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };
  
  // Handle downloading PDF
  const handleDownloadPDF = async () => {
    try {
      await downloadProductsPDF();
      setError(null);
    } catch (err) {
      setError('Failed to download PDF');
      console.error('Error downloading PDF:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-management">
      <h1 className="page-title">Products Management</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="product-grid">
        {/* Add Product Form */}
        <div className="card">
          <div className="card-header">
            <h2>Add Product</h2>
            <p>Product Details</p>
          </div>
          <div className="card-content">
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="productDetails">Product Details</label>
                <input
                  type="text"
                  id="productDetails"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                  placeholder="Enter product details"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="unitPrice">Unit Price</label>
                <input
                  type="number"
                  id="unitPrice"
                  min="0"
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <button 
                className="btn btn-primary btn-block"
                onClick={handleAddProduct}
              >
                <i className="fas fa-plus"></i> Add Product
              </button>
            </div>
          </div>
        </div>
        
        {/* Products List */}
        <div className="card">
          <div className="card-header">
            <h2>Products List</h2>
          </div>
          <div className="card-content">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Product Details</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>GST</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.details}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                          className="quantity-input"
                        />
                      </td>
                      <td>${product.unitPrice.toFixed(2)}</td>
                      <td>${product.total.toFixed(2)}</td>
                      <td>${product.gst.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleRemoveProduct(product._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-data">No products added yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {products.length > 0 && (
              <div className="product-summary">
                <div className="grand-total">
                  Grand Total (including GST): ${grandTotal.toFixed(2)}
                </div>
                <button 
                  className="btn btn-primary btn-block"
                  onClick={handleDownloadPDF}
                >
                  <i className="fas fa-download"></i> Download Products PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;