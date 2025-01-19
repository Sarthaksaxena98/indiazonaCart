const express = require('express');
const User = require('../models/users');  
const helperController = require('../controller/helperController');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    let returnData = await helperController.getAllUser(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
});

router.get('/users/:id', async (req, res) => {
  try {
    let returnData = await helperController.getUserData(req, res); 
    res.status(200).json(returnData);       
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}

});

module.exports = router;
