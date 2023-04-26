const favoriteModel = require('../models/favorite.model');
const productModel = require('../models/product.model');
const userModel = require('../models/user.models');

const addFavoriteProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const checkFavorite = await favoriteModel.checkFavorite(data);
    if (checkFavorite) {
      return reject({ message: 'The product has been loved by you' });
    } else {
      const arr = [];
      await favoriteModel(data)
        .save()
        .then((res) => {
          return resolve(res);
        })
        .catch((error) => {
          return reject({ message: `query failed, ${error}` });
        });
    }
  });
};

const unFavoriteProduct = (ownerID, favoriteID) => {
  return new Promise(async (resolve, reject) => {
    await favoriteModel
      .unFavoriteProduct(favoriteID, ownerID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getFavorite = (ownerID) => {
  return new Promise(async (resolve, reject) => {
    let arr = [];
    await favoriteModel
      .getFavorite(ownerID)
      .then(async (res) => {
        for (let item of res) {
          const getDetailsProduct = await productModel.getDetailsProduct(
            item.productID
          );
          const avgProduct = await averageModel.getAverage(item.productID);
          const getStore = await storeModel.findStoreByID(
            getDetailsProduct.storeID
          );
          if (getDetailsProduct && getStore && avgProduct) {
            arr.push({
              product: getDetailsProduct,
              store: getStore,
              rating: avgProduct.rating,
            });
          }
        }
        return resolve(arr);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  addFavoriteProduct: addFavoriteProduct,
  unFavoriteProduct: unFavoriteProduct,
  getFavorite: getFavorite,
};
