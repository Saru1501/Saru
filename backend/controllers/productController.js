const Product = require('../models/Product');
const PDFDocument = require('pdfkit');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { details, quantity, unitPrice } = req.body;
    
    // Validation
    if (!details || !quantity || !unitPrice) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    
    // Create product
    const product = await Product.create({
      details,
      quantity,
      unitPrice,
      total: quantity * unitPrice,
      gst: quantity * unitPrice * 0.18,
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid product data: ' + error.message);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    
    // If quantity or unitPrice is updated, recalculate total and GST
    if (req.body.quantity || req.body.unitPrice) {
      const quantity = req.body.quantity || product.quantity;
      const unitPrice = req.body.unitPrice || product.unitPrice;
      
      req.body.total = quantity * unitPrice;
      req.body.gst = req.body.total * 0.18;
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400);
    throw new Error('Error updating product: ' + error.message);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    
    await product.deleteOne();
    
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting product: ' + error.message);
  }
};

// @desc    Generate PDF of products
// @route   GET /api/products/pdf
// @access  Public
const generateProductsPDF = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    // Create a new PDF document
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=products.pdf');
    
    // Pipe the PDF document to the response
    doc.pipe(res);
    
    // Add title
    doc.fontSize(20).text('Products List', { align: 'center' });
    doc.moveDown();
    
    // Add date
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    
    // Add table header
    doc.fontSize(12);
    doc.text('Details', 50, 100);
    doc.text('Quantity', 250, 100);
    doc.text('Unit Price', 350, 100);
    doc.text('Total', 450, 100);
    doc.text('GST', 550, 100);
    doc.moveDown();
    
    // Add products
    let y = 130;
    products.forEach(product => {
      if (y > 700) { // Check if we need a new page
        doc.addPage();
        y = 50;
      }
      
      doc.text(product.details, 50, y);
      doc.text(product.quantity.toString(), 250, y);
      doc.text(`$${product.unitPrice.toFixed(2)}`, 350, y);
      doc.text(`$${product.total.toFixed(2)}`, 450, y);
      doc.text(`$${product.gst.toFixed(2)}`, 550, y);
      
      y += 30;
    });
    
    // Calculate totals
    const totals = products.reduce((acc, product) => {
      acc.total += product.total;
      acc.gst += product.gst;
      return acc;
    }, { total: 0, gst: 0 });
    
    // Add totals
    y += 20;
    doc.moveDown();
    doc.fontSize(14).text('Totals:', 350, y);
    y += 20;
    doc.fontSize(12).text(`Total Amount: $${totals.total.toFixed(2)}`, 350, y);
    y += 20;
    doc.text(`Total GST: $${totals.gst.toFixed(2)}`, 350, y);
    
    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500);
    throw new Error('Error generating PDF: ' + error.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  generateProductsPDF,
};