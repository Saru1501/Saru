import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import InvoicesList from './pages/InvoicesList';
import AddInvoice from './pages/AddInvoice';
import EditInvoice from './pages/EditInvoice';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<InvoicesList />} />
            <Route path="/invoices/add" element={<AddInvoice />} />
            <Route path="/invoices/edit/:id" element={<EditInvoice />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;