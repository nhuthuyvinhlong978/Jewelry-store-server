const errorHelper = require('../helpers/error.helper');
const categoryHelper = require('../helpers/category.helper');
const getCategory = async (req, res) => {
  try {
    const id = req.params.categoryID;

    await categoryHelper
      .getCategory(id)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const getListCategory = async (req, res) => {
  try {
    await categoryHelper
      .getListCategory()
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const addCategory = async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    await categoryHelper
      .addCategory(categoryName)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const udpateCategory = async (req, res) => {
  try {
    const categoryID = req.body.categoryID;
    const categoryName = req.body.categoryName;
    await categoryHelper
      .udpateCategory(categoryID, categoryName)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    await categoryHelper
      .deleteCategory(categoryID)
      .then((result) => {
        return res.status(200).json({ result: true, data: result });
      })
      .catch((error) => {
        return errorHelper.handleError(res, 500, error.message);
      });
  } catch (error) {
    return errorHelper.handleError(res, 500, error);
  }
};

module.exports = {
  getCategory: getCategory,
  getListCategory: getListCategory,
  addCategory: addCategory,
  udpateCategory: udpateCategory,
  deleteCategory: deleteCategory,
};
