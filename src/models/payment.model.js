const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    orderID: {type: String, required: true},
    paymentPaypalID: {type: String, required: true},
    created: {type: Date, default: Date.now},
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);

module.exports = mongoose.model('Payment', PaymentSchema);
