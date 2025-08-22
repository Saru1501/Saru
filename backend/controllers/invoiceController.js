const Invoice = require('../models/Invoice');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Public
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Public
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
    
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Public
const createInvoice = async (req, res) => {
  try {
    console.log('Received invoice data:', req.body);
    const { title, description, amount, dueDate } = req.body;
    
    // Validation
    if (!title || !description || !amount || !dueDate) {
      console.log('Validation failed - missing required fields');
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    
    // Create invoice
    console.log('Attempting to create invoice...');
    const invoice = await Invoice.create({
      title,
      description,
      amount,
      dueDate,
    });
    
    console.log('Invoice created successfully:', invoice);
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(400);
    throw new Error('Invalid invoice data: ' + error.message);
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Public
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
    
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(400);
    throw new Error('Error updating invoice: ' + error.message);
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Public
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
    
    await invoice.deleteOne();
    
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting invoice: ' + error.message);
  }
};

module.exports = {
   getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};