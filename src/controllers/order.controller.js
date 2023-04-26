const errorHelper = require('../helpers/error.helper');
const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model');
const paymentModel = require("../models/payment.model");
const addOrder = async (req, res) => {
    try{
        const data = {
            ownerID: req.body.ownerID,
            listOrder: req.body.listOrder,
            receiver: req.body.receiver,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
        }
        const paypalID = req.body.paypalID;

        await orderModel(data).save().then(async data => {
            if(data.paymentMethod !== 'cod'){
                await paymentModel({
                    orderID: data._id,
                    paymentPaypalID: paypalID
                }).save();

                await cartModel.deleteManyCart(data.ownerID);
                return res.status(200).json({ result: true });
            }else{
                await cartModel.deleteManyCart(data.ownerID)
                return res.status(200).json({ result: true });
            }
        });
    }catch(error){
        console.log(error);
        return errorHelper.handleError(res, 500, error);
    }
}

const historyOrder = async (req, res) => {
    try{
        const ownerID = req.params.ownerID;
        await orderModel.getOrderOwner(ownerID).then(result => {
            return res.status(200).json({ result: true, data: result });
          
        })    
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}

const getListOrder = async (req, res) => {
    try{
        const ownerID = req.params.ownerID;
        await orderModel.getAllOrder().then(result => {
            return res.status(200).json({ result: true, data: result });
          
        })    
    }catch(error){
        return errorHelper.handleError(res, 500, error);
    }
}


module.exports = {
    addOrder: addOrder,
    historyOrder: historyOrder,
    getListOrder: getListOrder
}