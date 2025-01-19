const express = require('express');
const TaxAmount = require('../models/taxAmount');
const helperController = require('../controller/helperController');


const router = express.Router();

// Add Tax Amount
router.post('/tax-amount', async (req, res) => {
    try {
        let returnData = await helperController.getProduct(req, res); 
        res.status(200).json(returnData);       
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the tax amount.' });
    }
});

router.get('/tax-amounts', async (req, res) => {
    try {
        let returnData = await helperController.getTaxAmounts(req, res); 
        res.status(200).json(returnData);       
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the tax amounts.' });
    }
});

module.exports = router;
