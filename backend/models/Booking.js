const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  userId: {type: String, required: true},  // <-- yahi sirf 'String' kar do!
  movieId: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
  seatsBooked: {type: Number, required: true},
  bookingDate: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Booking', bookingSchema);