const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', invoiceSchema);