const express = require('express');
const UserAddress = require('../models/userAddress'); 
const router = express.Router();
const helperController = require('../controller/helperController');


router.get('/user-addresses', async (req, res) => {
  try {
    let returnData = await helperController.getUserAddress(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
  });

router.get('/user-addresses/:id', async (req, res) => {
  
  try {
    let returnData = await helperController.getUserAddressData(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
});

module.exports = router;
