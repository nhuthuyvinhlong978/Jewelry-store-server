const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: { type: String, trim: true },
    categoryType: { type: String, required: false, default: '' },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);
CategorySchema.statics = {
  getListsCategory() {
    return this.find({}).exec();
  },
  getDetailsCategory(id) {
    return this.findOne({ _id: id }).exec();
  },
  deleteCategory(id) {
    return this.findOneAndDelete({ _id: id }).exec();
  },
  updateCategory(id, name) {
    return this.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          categoryName: name,
        },
      }
    );
  },
};

module.exports = mongoose.model('Category', CategorySchema);
