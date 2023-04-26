const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
  {
    ownerID: { type: String, required: true },
    productID: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updateAt",
    },
  }
);

FavoriteSchema.statics = {
  checkFavorite(data) {
    return this.findOne({
      ownerID: data.ownerID,
      productID: data.productID,
    }).exec();
  },
  unFavoriteProduct(id, ownerID) {
    return this.findOneAndDelete({ ownerID: ownerID, productID: id }).exec();
  },
  getFavorite(ownerID) {
    return this.find({ ownerID: ownerID }).exec();
  },
  getCountFavoriteUser(ownerID) {
    return this.countDocuments({
      ownerID: ownerID,
    }).exec();
  },
};

module.exports = mongoose.model("Favorite", FavoriteSchema);
