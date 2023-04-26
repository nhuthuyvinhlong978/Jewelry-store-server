const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    ownerID: {type: String, required: true},
    listOrder: [
        {
            productID: {type: String, required: true},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
        }
    ],
    receiver: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    address: {type: String, default: ''},
    paymentMethod: {type: String, default: 'cod'},
    created: {type: Date, default: Date.now},
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);

OrderSchema.statics = {
  getOrderOwner(id){
    return this.find({ownerID: id}).sort({_id: -1}).exec();
  },
  getAllOrder(){
    return this.find().sort({_id: -1}).exec();
  }
}

module.exports = mongoose.model('Order', OrderSchema);
