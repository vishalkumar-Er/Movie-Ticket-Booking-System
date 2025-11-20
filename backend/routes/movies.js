const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a movie (for admin use)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;