const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();
    res.status(201).json("User registered");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(404).json("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({token, username: user.username});
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;