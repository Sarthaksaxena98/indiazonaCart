const express = require('express');
const Product = require('../models/product');
const helperController = require('../controller/helperController');

const router = express.Router();

// Add Product
router.post('/product', async (req, res) => {
    try {
        let returnData = await helperController.getProduct(req, res); 
        res.status(200).json(returnData);       
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
