const express = require('express');
const VendorInvoice = require('../models/venderInvoice'); 

const router = express.Router();
  

router.get('/vendor-invoices', async (req, res) => {
  try {
    const vendorInvoices = await VendorInvoice.findAll();
    res.status(200).json(vendorInvoices);
  } catch (error) {
    console.error('Error fetching vendor invoices:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/vendor-invoices/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const vendorInvoice = await VendorInvoice.findByPk(id);
    if (!vendorInvoice) {
      return res.status(404).json({ message: 'Vendor invoice not found' });
    }
    res.status(200).json(vendorInvoice);
  } catch (error) {
    console.error('Error fetching vendor invoice:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
