const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');  // Adjust the path to your CartItem model
const helperController = require('../controller/helperController');


router.post('/cart-item', async (req, res) => {
    try {
        let returnData = await helperController.getCartItem(req, res); 
        res.status(200).json(returnData);       
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while creating the cart item.',
        });
    }

});
module.exports = router;