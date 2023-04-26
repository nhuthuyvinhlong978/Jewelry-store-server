const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default:"" },
    message: { type: String, default:"" },
    created: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);

ContactSchema.statics = {
  getListContact(){
    return this.find().sort({_id: -1}).exec();
  }
};

module.exports = mongoose.model('Contact', ContactSchema);
