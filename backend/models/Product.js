const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    details: {
      type: String,
      required: [true, 'Please add product details'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a quantity'],
      min: [1, 'Quantity must be at least 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Please add a unit price'],
      min: [0, 'Unit price cannot be negative'],
    },
    total: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total and GST before saving
productSchema.pre('save', function (next) {
  this.total = this.quantity * this.unitPrice;
  this.gst = this.total * 0.18; // 18% GST
  next();
});

module.exports = mongoose.model('Product', productSchema);