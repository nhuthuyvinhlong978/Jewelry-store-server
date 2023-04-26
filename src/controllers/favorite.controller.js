const errorHelper = require('../helpers/error.helper');
const favoriteHelper = require('../helpers/favorite.helper');
const addFavoriteProduct = async (req, res) => {
  try {
    const data = {
      ownerID: req.body.ownerID,
      productID: req.body.productID,
    };
    if (!data.ownerID || !data.productID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .addFavoriteProduct(data)
        .then(() => {
          return res.status(200).json({ result: true });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const unFavoriteProduct = async (req, res) => {
  try {
    const favoriteID = req.body.favoriteID;
    const ownerID = req.body.ownerID;
    if (!favoriteID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .unFavoriteProduct(favoriteID, ownerID)
        .then(() => {
          return res.status(200).json({ result: true });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getFavorite = async (req, res) => {
  try {
    const ownerID = req.params.ownerID;
    if (!ownerID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .getFavorite(ownerID)
        .then((result) => {
          return res.status(200).json({ result: true, data: result });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getRatingProduct = async (req, res) => {
  try {
    const data = {
      id: req.params.productID,
      page: parseInt(req.params.page),
    };
    if (!data.id || !typeof data.page == 'number') {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .getRating(data, 'product')
        .then((result) => {
          return res.status(200).json({ result: true, data: result });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getRatingStore = async (req, res) => {
  try {
    const data = {
      id: req.params.storeID,
      page: parseInt(req.params.page),
    };
    if (!data.id || !typeof data.page == 'number') {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .getRating(data, 'store')
        .then((result) => {
          return res.status(200).json({ result: true, data: result });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getCountRating = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await favoriteHelper
        .getCountRating(id)
        .then((result) => {
          return res.status(200).json({ result: true, data: result });
        })
        .catch((error) => {
          return errorHelper.handleError(res, 500, error.message);
        });
    }
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

module.exports = {
  addFavoriteProduct: addFavoriteProduct,
  unFavoriteProduct: unFavoriteProduct,
  getFavorite: getFavorite,
  getRatingProduct: getRatingProduct,
  getRatingStore: getRatingStore,
  getCountRating: getCountRating,
};
