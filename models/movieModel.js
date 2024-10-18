// models/movieModel.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A movie must have a title"],
  },
  director: {
    type: String,
    required: [true, "A movie must have a director"],
  },
  releaseYear: {
    type: Number,
    required: [true, "A movie must have a release year"],
  },
  genre: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;