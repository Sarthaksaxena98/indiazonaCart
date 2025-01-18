const express = require('express');
const UserAddress = require('../models/userAddress'); 
const router = express.Router();

router.get('/user-addresses', async (req, res) => {
    try {
      const userAddresses = await UserAddress.findAll();
      
      res.status(200).json(userAddresses);
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

router.get('/user-addresses/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const userAddress = await UserAddress.findByPk(id);

    if (!userAddress) {
      return res.status(404).json({ message: 'User address not found' });
    }

    res.status(200).json(userAddress);
  } catch (error) {
    console.error('Error fetching user address:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
