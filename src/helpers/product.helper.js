const productModel = require('../models/product.model');
const cloudinary = require('../configs/cloud.js');

const getAvgProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    await averageModel
      .getAverage(productID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getDetailsProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getDetailsProduct(productID)
      .then(async (res) => {
       return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getProductCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    if (data.page == 0) {
      data.skip = 0;
    } else {
      data.skip = data.page * 16;
    }
    const arr = [];
    await productModel
      .getProductCategory(data)
      .then(async (res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getCountProductCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getCountProductCategory(data)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const addProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const img = [];
    for (let item of data.image) {
      let filePath = item.tempFilePath;
      await cloudinary()
        .uploader.upload(filePath, (err, result) => {
          if (err) {
            return reject({
              message: 'Có lỗi khi upload ảnh, vui lòng thử lại sau',
            });
          }
        })
        .then(async (result) => {
          imgData = {
            publicID: result.public_id,
            url: result.url,
          };
          img.push(imgData);
        })
        .catch((error) => {
          console.log('error ', error);
        });
    }

    let newData = {
      name: data.name,
      price: data.price,
      code: data.code,
      categoryID: data.categoryID,
      sale: data.sale,
      size: data.size,
      description: data.description,
      image: img,
    };
    await productModel(newData)
      .save()
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getProductNew = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getProductNew(categoryID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListsProduct = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    await productModel
      .getListsProduct(categoryID)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

const getListProductNewSale = (categoryID, type) => {
  return new Promise(async (resolve, reject) => {
    if(type == 'new'){
      await productModel.getListProductNew(categoryID).then(res => {
        return resolve(res);
      }).catch(error => {
        return reject({ message: `query failed, ${error}` });
      })
    }else if (type == 'sale'){
      await productModel.getListProductSale(categoryID).then(res => {
        return resolve(res);
      }).catch(error => {
        return reject({ message: `query failed, ${error}` });
      })
    }
    
  });
};

const getListProductFilter = (categoryID, min, max) => {
  return new Promise(async (resolve, reject) => {
    await productModel.getListProductFilter(categoryID, min, max).then(res => {
      return resolve(res);
    }).catch(error => {
      return reject({ message: `query failed, ${error}` });
    })    
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    await productModel.deleteProduct(id).then(res => {
      return resolve(res);
    }).catch(error => {
      return reject({ message: `query failed, ${error}` });
    })    
  });
};

const searchProduct = (search) => {
  return new Promise(async (resolve, reject) => {
    await productModel.searchProduct(search).then(res => {
      return resolve(res);
    }).catch(error => {
      return reject({ message: `query failed, ${error}` });
    })    
  });
};


const updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    const img = [];
    for (let item of data.listsImageProduct) {
      let filePath = item.tempFilePath;
      if(filePath){
        await cloudinary()
        .uploader.upload(filePath, (err, result) => {
          if (err) {
            return reject({
              message: 'Có lỗi khi upload ảnh, vui lòng thử lại sau',
            });
          }
        })
        .then(async (result) => {
          imgData = {
            publicID: result.public_id,
            url: result.url,
          };
          img.push(imgData);
        })
        .catch((error) => {
          console.log('error ', error);
        });
      }else{
        img.push(item);
      }
    }

    let newData = {
      name: data.name,
      price: data.price,
      code: data.code,
      sale: data.sale,
      size: data.size,
      description: data.description,
      image: img,
    };
    await productModel
      .updateProduct(data.productID, newData)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        return reject({ message: `query failed, ${error}` });
      });
  });
};

module.exports = {
  getAvgProduct: getAvgProduct,
  getDetailsProduct: getDetailsProduct,
  getProductCategory: getProductCategory,
  getCountProductCategory: getCountProductCategory,
  addProduct: addProduct,
  getProductNew: getProductNew,
  getListsProduct: getListsProduct,
  getListProductNewSale: getListProductNewSale,
  getListProductFilter: getListProductFilter,
  deleteProduct: deleteProduct,
  searchProduct: searchProduct,
  updateProduct: updateProduct
};
