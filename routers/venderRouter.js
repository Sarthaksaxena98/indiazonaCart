const express = require('express');
const VendorInvoice = require('../models/venderInvoice'); 

const router = express.Router();
const helperController = require('../controller/helperController');
  

router.get('/vendor-invoices', async (req, res) => {
  try {
    let returnData = await helperController.getAllVendor(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
});

router.get('/vendor-invoices/:id', async (req, res) => {
  try {
    let returnData = await helperController.getVendorData(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
});


module.exports = router;
