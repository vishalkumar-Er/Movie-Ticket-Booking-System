const express = require('express');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, movieId, seatsBooked } = req.body;
  let movie = null;
  try {
    movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (movie.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats" });
    }

    // Seats decrement
    movie.seatsAvailable -= seatsBooked;
    await movie.save();

    try {
      const booking = new Booking({ userId, movieId, seatsBooked });
      await booking.save();
      return res.status(201).json({ message: "Booking Confirmed!" });
    } catch (err) {
      // Booking fail, rollback seats
      movie.seatsAvailable += seatsBooked;
      await movie.save();
      console.error("Booking save failed, rollback seats:", err);   // Debug log
      return res.status(500).json({ message: "Booking Failed!" });
    }
  } catch (outerErr) {
    // Outer DB fail, rollback if movie context exists and was saved
    if (movie && typeof seatsBooked === "number") {
      try {
        movie.seatsAvailable += seatsBooked;
        await movie.save();
        console.error("Outer catch rollback seats.");
      } catch (e) {
        console.error("Rollback error:", e);
      }
    }
    console.error("Booking POST fatal error:", outerErr); // Debug log
    return res.status(500).json({ message: "Booking Failed!" });
  }
});

module.exports = router;