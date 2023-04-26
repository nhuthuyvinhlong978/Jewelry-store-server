
const errorHelper = require('../helpers/error.helper');
const cartModel = require("../models/cart.model");
const productModel = require('../models/product.model');
const addCart = async (req, res) => {
    try{
        const data = {
            ownerID: req.body.ownerID,
            productID: req.body.productID,
            quantity: req.body.quantity
        }
        const findCart = await cartModel.findCartOwner(data);
        if(findCart){
            return res.status(200).json({ result: true});
        }else{
            await cartModel(data).save().then(data => {
                return res.status(200).json({ result: true, data: data });
            }).catch(error => {
                return errorHelper.handleError(res, 500, error);
            })
        }
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const deleteCart = async (req, res) => {
    try{
       const id = req.params.id;
       await cartModel.deleteCart(id).then(data => {
            return res.status(200).json({ result: true});
        }).catch(error => {
            return errorHelper.handleError(res, 500, error);
        })
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const getListCart = async (req, res) => {
    try{
       const id = req.params.id;
       await cartModel.getListCart(id).then(async data => {
        const arr = [];
        for(let item of data){
            const findProduct = await productModel.getDetailsProduct(item.productID);
            if(findProduct){
                arr.push({product: findProduct, cardID: item._id})
            }
        }
        console.log(arr)
        return res.status(200).json({ result: true, data: arr});
    }).catch(error => {
        return errorHelper.handleError(res, 500, error);
    })
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

module.exports = {
    addCart: addCart,
    deleteCart: deleteCart,
    getListCart: getListCart
}