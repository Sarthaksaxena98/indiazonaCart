const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Add Product
router.post('/product', async (req, res) => {
    try {
        const { user_id, item_id, product_name, brand_id, packed_weight, price, description } = req.body; // Complete the body destructuring


        const newProduct = await Product.create({
            user_id,
            item_id,
            product_name,
            brand_id,
            packed_weight,
            price,  // assuming price is a field
            description  // assuming description is a field
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the product.' });
    }
});

module.exports = router;
