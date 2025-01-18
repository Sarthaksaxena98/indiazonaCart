const express = require('express');
const ProductOrderInvoice = require('../models/productOrderInvoice'); 
const router = express.Router();

// Route to fetch a specific product order invoice by ID
router.get('/product-order-invoices/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const productOrderInvoice = await ProductOrderInvoice.findByPk(id);

    if (!productOrderInvoice) {
      return res.status(404).json({ message: 'Product order invoice not found' });
    }

    res.status(200).json(productOrderInvoice);
  } catch (error) {
    console.error('Error fetching product order invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
