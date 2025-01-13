const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');  // Adjust the path to your CartItem model


router.post('/cart-item', async (req, res) => {
    const { user_id, product_id, quantity, discounts_charges_id, tax_amount_id, status } = req.body;

    try {
        // Create a new cart item
        const newCartItem = await CartItem.create({
            user_id,
            product_id,
            quantity,
            discounts_charges_id,
            tax_amount_id,
            status,  // Optional, defaults to 'Pending' if not provided
        });

        res.status(201).json({
            message: 'Cart item created successfully!',
            cartItem: newCartItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the cart item.',
        });
    }
});
module.exports = router;