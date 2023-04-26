const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, default: '' },
    categoryID: { type: String, required: true },
    image: [
      {
        url: { type: String },
        publicID: { type: String },
      },
    ],
    price: { type: Number, default: 0 },
    sale: { type: Boolean, default: 'false' },
    size: { type: String, default: 'S' },
    description: { type: String, default: '' },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: 'createAt',
      updatedAt: 'updateAt',
    },
  }
);

ProductSchema.statics = {
  getCountProductCategory(data) {
    return this.countDocuments({
      $and: [
        { subCategoryID: data.categoryID },
        { groupCategoryID: data.groupCategoryID },
        { subGroupCategoryID: data.subGroupCategoryID },
      ],
    });
  },
  getCountProductStore(storeID) {
    return this.countDocuments({
      storeID: storeID,
    }).exec();
  },
  getCountProductHighlightStore(storeID) {
    return this.countDocuments({
      $and: [{ storeID: storeID }, { highlight: true }],
    }).exec();
  },

  getPagiProductStore(data) {
    return this.find({ storeID: data.storeID })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getPagiProductHighlightStore(data) {
    return this.find({ storeID: data.storeID, highlight: true })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getDetailsProduct(id) {
    return this.findOne({ _id: id }).exec();
  },
  getCountProductNewStore(storeID) {
    return this.countDocuments({
      $and: [{ storeID: storeID }, { new: true }],
    }).exec();
  },
  getPagiProductNewStore(data) {
    return this.find({ storeID: data.storeID, new: true })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getProductCategory(data) {
    console.log(data);
    return this.find({
      subCategoryID: data.categoryID,
      groupCategoryID: data.groupCategoryID,
      subGroupCategoryID: data.subGroupCategoryID,
    })
      .sort({ _id: -1 })
      .limit(16)
      .skip(data.skip)
      .exec();
  },
  getProductNew(categoryID) {
    return this.find({ categoryID: categoryID })
      .sort({ _id: -1 })
      .limit(4)
      .exec();
  },

  getListsProduct(categoryID) {
    if (categoryID == 'all') {
      return this.find().sort({ _id: -1 }).exec();
    } else {
      return this.find({ categoryID: categoryID }).sort({ _id: -1 }).exec();
    }
  },
  getListProductNew(categoryID){
    return this.find({categoryID: categoryID}).sort({_id: -1}).limit(4).exec();
  },
  getListProductSale(categoryID){
    return this.find({categoryID: categoryID, sale: true}).sort({_id: -1}).limit(4).exec();
  },
  getListProductFilter(categoryID, min, max) {
    console.log(min, max);
    if (categoryID == 'all') {
      return this.find({price: {$gte: min , $lte: max }}).sort({ _id: -1 }).exec();
    } else {
      return this.find({categoryID: categoryID, price: {$gte: min , $lte: max }}).sort({ _id: -1 }).exec();
    }
  },
  deleteProduct(id){
    return this.findOneAndDelete({_id: id}).exec();
  },
  searchProduct(search){
    return this.find({ "name": { "$regex": search, "$options": "i" } }).exec();
  },
  updateProduct(id, data){
    return this.findOneAndUpdate({_id: id}, {
      $set: {
        name: data.name,
        price: data.price,
        code: data.code,
        sale: data.sale,
        size: data.size,
        description: data.description,
        image: data.image,
      }
    },{ safe: true, upsert: true, new: true }).exec();
  }
};

module.exports = mongoose.model('Product', ProductSchema);
