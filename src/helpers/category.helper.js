const categoryModel = require('../models/category.model');
const getCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .getDetailsCategory(id)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListCategory = () => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .getListsCategory()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const addCategory = (categoryName) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel({ categoryName: categoryName })
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const udpateCategory = (id, name) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .updateCategory(id, name)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    await categoryModel
      .deleteCategory(id)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getCategory: getCategory,
  getListCategory: getListCategory,
  addCategory: addCategory,
  udpateCategory: udpateCategory,
  deleteCategory: deleteCategory,
};
