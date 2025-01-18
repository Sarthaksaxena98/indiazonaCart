const express = require('express');
const User = require('../models/users');  

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();  
    res.status(200).json(users);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the user' });
  }
});

module.exports = router;
