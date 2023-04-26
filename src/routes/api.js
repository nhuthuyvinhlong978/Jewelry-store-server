const router = require("express").Router();
const AuthMiddleWare = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/user.controller");
const CategoryController = require("../controllers/category.controller");
const FavoriteController = require("../controllers/favorite.controller");
const ProductController = require("../controllers/product.controller");
const CartController = require("../controllers/cart.controller");
const OrderController = require("../controllers/order.controller");
const product = require("../product.json");

const userModel = require("../models/user.models");
const productModel = require("../models/product.model");

const initAPIs = (app) => {
  router.get("/test", async (req, res) => {
    const data = {
      email: "admin@gmail.com",
      password: await userModel.hashPassword("admin123"),
    };
    await userModel(data)
      .save()
      .then((res) => {
        console.log(res);
      });
  });

  router.get("/api/test/addProduct", async (req, res) => {
    console.log(product.product.length);
    // for(let item of product.product){
    //   const addProduct = await productModel(item);
    //   await addProduct.save();
    //   console.log("success");
    // }
    res.send("success");
  });

  /*API ACCOUNT*/
  //REGISTER
  router.post("/api/register", UserController.register);
  //LOGIN
  router.post("/api/login", UserController.login);
  //REFRESHTOKEN
  router.post("/api/refresh-token", AuthController.refreshToken);
  //FORGOT PASSWORD
  router.post("/api/forgot-password", UserController.forgotPassword);

  /*API CATEGORY*/
  //CATEGORY
  router.get("/api/category/:categoryID", CategoryController.getCategory);
  //LISTS CATEGORY
  router.get("/api/listsCategory", CategoryController.getListCategory);

  //DETAILS PRODUCT
  router.get(
    "/api/details-product/:productID",
    ProductController.getDetailsProduct
  );

  //lists product news
  router.get(
    "/api/listsProduct/:categoryID",
    ProductController.getListsProduct
  );

  router.get(
    "/api/listProductFilter/:categoryID/:minPrice/:maxPrice",
    ProductController.getListProductFilter
  );

  //LISTS PRODUCT SALE OR NEW
  router.get(
    "/api/listProductNewSale/:categoryID/:type",
    ProductController.getListProductNewSale
  );

  //FILTER PRODUCT
  router.get(
    "/api/count-product-category/:categoryID/:groupCategoryID/:subGroupCategoryID",
    ProductController.getCountProductCategory
  );
  router.get(
    "/api/product-category/:categoryID/:groupCategoryID/:subGroupCategoryID/:page",
    ProductController.getProductCategory
  );

  //COUNT RATING
  router.get("/api/count-rating/:id", FavoriteController.getCountRating);

  /*RATING PRODUCT*/
  router.get(
    "/api/rating-product/:productID/:page",
    FavoriteController.getRatingProduct
  );

  /*API ACCOUNT*/
  //PROFILE
  router.get("/api/profile/:ownerID", UserController.getProfile);
  //UPDATE PROFILE
  router.post("/api/profile", UserController.updateProfile);
  //RESET PASSWORD
  router.post("/api/update-password", UserController.resetPassword);

  /*API Cart */
  router.post("/api/cart/add", CartController.addCart);
  router.delete("/api/cart/delete/:id", CartController.deleteCart);
  router.get("/api/cart/list/:id", CartController.getListCart);

  /*API Order */
  router.post("/api/order/add", OrderController.addOrder);

  router.get("/api/order/history/:ownerID", OrderController.historyOrder);

  /*API FAVORITE*/
  //ADD FAVORITE
  router.post("/api/add-favorite", FavoriteController.addFavoriteProduct);
  //UN FAVORITE
  router.post("/api/un-favorite", FavoriteController.unFavoriteProduct);
  //GET FAVORITE
  router.get("/api/favorite/:ownerID", FavoriteController.getFavorite);

  //add contact
  router.post("/api/contact/add", UserController.addContact);

  //search product
  router.get("/api/product/search/:search", ProductController.searchProduct);

  //api admin
  //category
  router.post("/api/addCategory", CategoryController.addCategory);
  //updateCategory
  router.post("/api/updateCategory", CategoryController.udpateCategory);
  //deleteCategory
  router.delete("/api/category/:categoryID", CategoryController.deleteCategory);

  //add product
  router.post("/api/addProduct", ProductController.addProduct);
  //delete product
  router.delete(
    "/api/product/delete/:productID",
    ProductController.deleteProduct
  );
  //update product
  router.post("/api/product/update", ProductController.updateProduct);
  //USER
  router.get("/api/listUser", UserController.getListUser);

  //CONTACT
  router.get("/api/contact/lists", UserController.getListContact);

  //Order
  router.get("/api/order/lists", OrderController.getListOrder);

  return app.use("/", router);
};

module.exports = initAPIs;
