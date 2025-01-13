const express = require('express');
const router = express.Router();

const Order = require('../models/Order'); // Import the Order model

// POST /orders - Create a new order
router.post('/orders', async (req, res) => {
    const {
        user_id,
        order_number,
        order_status,
        payment_status,
        payment_mode,
        discounts_charges_id,
    } = req.body;

    try {
        // Create a new order entry in the database
        const newOrder = await Order.create({
            user_id,
            order_number,
            order_status,
            payment_status,
            payment_mode,
            discounts_charges_id,
        });

        // Send the newly created order data back in the response
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
});
module.exports = router;