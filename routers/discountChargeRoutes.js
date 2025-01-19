const express = require('express');
const DiscountCharge = require('../models/discount');
const helperController = require('../controller/helperController');
const router = express.Router();

// Add Discount/Charge
router.post('/discount-charge', async (req, res) => {
   try {
    let discountCharge = helperController.getDiscountCharges(req, res);
    res.status(200).json(discountCharge);     
   } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the discount/charge.' });
   } 
});

module.exports = router;
