const express = require('express');
const router = express.Router();
const helperController = require('../controller/helperController');
const Order = require('../models/Order'); // Import the Order model

// POST /orders - Create a new order
router.post('/orders', async (req, res) => {
    try {
        let returnData = await helperController.getorder(req, res);
        res.status(200).json(returnData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
});
module.exports = router;