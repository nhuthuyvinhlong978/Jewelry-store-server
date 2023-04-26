const errorHelper = require('../helpers/error.helper');
const productHelper = require('../helpers/product.helper');

const getDetailsProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    if (!productID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await productHelper
        .getDetailsProduct(productID)
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

const getProductCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      groupCategoryID:
        req.params.groupCategoryID == 'undefined'
          ? ''
          : req.params.groupCategoryID,
      subGroupCategoryID:
        req.params.subGroupCategoryID == 'undefined'
          ? ''
          : req.params.subGroupCategoryID,
      page: parseInt(req.params.page),
    };
    if (!data.categoryID || !typeof data.page == 'number') {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await productHelper
        .getProductCategory(data)
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

const getCountProductCategory = async (req, res) => {
  try {
    const data = {
      categoryID: req.params.categoryID,
      groupCategoryID:
        req.params.groupCategoryID == 'undefined'
          ? ''
          : req.params.groupCategoryID,
      subGroupCategoryID:
        req.params.subGroupCategoryID == 'undefined'
          ? ''
          : req.params.subGroupCategoryID,
    };
    if (!data.categoryID) {
      return errorHelper.handleError(res, 500, 'Data empty');
    } else {
      await productHelper
        .getCountProductCategory(data)
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

const addProduct = async (req, res) => {
  try {
    let image;
    if (Array.isArray(req.files.image)) {
      image = req.files.image;
    } else {
      image = [req.files.image];
    }
    const data = {
      name: req.body.name,
      price: parseInt(req.body.price),
      categoryID: req.body.categoryID,
      sale: req.body.sale,
      size: req.body.size,
      code: req.body.code,
      image: image,
      description: req.body.description,
    };
    console.log(data);

    await productHelper
      .addProduct(data)
      .then((result) => {
        return res.status(200).json({
          result: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const getProductNew = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await productHelper
      .getProductNew(categoryID)
      .then((result) => {
        return res.status(200).json({
          result: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const getListsProduct = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await productHelper
      .getListsProduct(categoryID)
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const getListProductNewSale = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    const type = req.params.type;
    await productHelper
      .getListProductNewSale(categoryID, type)
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const getListProductFilter = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;
    await productHelper
      .getListProductFilter(categoryID, minPrice, maxPrice)
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    await productHelper
      .deleteProduct(productID)
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: "success",
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const searchProduct = async (req, res) => {
  try {
    const search = req.params.search;
    await productHelper
      .searchProduct(search)
      .then((result) => {
        return res.status(200).json({
          result: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `add introduce failed, ${error}` });
  }
};

const updateProduct = async (req, res) => {
  try {
    const listsImageProduct = [];
    if (req.files) {
      if (req.files["image"]) {
        if (Array.isArray(req.files["image"])) {
          for (let item of req.files["image"]) {
            listsImageProduct.push(item);
          }
        } else {
          listsImageProduct.push(req.files["image"]);
        }
      }
    }
    if (req.body.image) {
      let data = req.body.image;
      if (Array.isArray(data)) {
        if (data.length > 1) {
          for (let item of data) {
            listsImageProduct.push(JSON.parse(item));
          }
        } else {
          listsImageProduct.push(JSON.parse(data[0]));
        }
      } else {
        listsImageProduct.push(JSON.parse(data));
      }
    }

    const data = {
      productID: req.body.productID,
      name: req.body.name,
      price: parseInt(req.body.price),
      categoryID: req.body.categoryID,
      sale: req.body.sale,
      size: req.body.size,
      code: req.body.code,
      listsImageProduct: listsImageProduct,
      description: req.body.description,
    };

    await productHelper
      .updateProduct(data)
      .then((result) => {
        return res.status(200).json({
          result: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ result: false, message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: `update product failed, ${error}` });
  }
};

module.exports = {
  getCountProductCategory: getCountProductCategory,
  getProductCategory: getProductCategory,
  getDetailsProduct: getDetailsProduct,
  addProduct: addProduct,
  getProductNew: getProductNew,
  getListsProduct: getListsProduct,
  getListProductNewSale: getListProductNewSale,
  getListProductFilter: getListProductFilter,
  deleteProduct: deleteProduct,
  searchProduct: searchProduct,
  updateProduct: updateProduct
};
