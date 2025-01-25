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

router.get('/product/:id', async (req, res) => {
  try {
      const { id } = req.params; // Get the product ID from URL parameter
      
      // Fetch the product from the database
      const product = await Product.findByPk(id);
      
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
  }
});

// Get Products by user_id (optional filter)
router.get('/products', async (req, res) => {
  try {
      const { user_id, brand_id, is_active } = req.query; // You can add more query params as needed
      
      let filter = {};
      
      if (user_id) filter.user_id = user_id;
      if (brand_id) filter.brand_id = brand_id;
      if (is_active !== undefined) filter.is_active = is_active;
      
      const products = await Product.findAll({
          where: filter
      });
      
      return res.status(200).json(products);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
