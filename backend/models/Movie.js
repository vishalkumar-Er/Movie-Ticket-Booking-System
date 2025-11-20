const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  theater: String,
  showtimes: [String],
  seatsAvailable: {type: Number, default: 30}
});
module.exports = mongoose.model('Movie', movieSchema);