const express = require('express');
const ProductOrderInvoice = require('../models/productOrderInvoice'); 
const router = express.Router();
const helperController = require('../controller/helperController');

// Route to fetch a specific product order invoice by ID
router.get('/product-order-invoices/:id', async (req, res) => {
  try {
    let returnData = await helperController.getProductOrderInvoice(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
  res.status(500).json({ message: 'Server error', error });
}
});

module.exports = router;
