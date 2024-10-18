const { body, validationResult } = require('express-validator'); // Import first
const Movie = require('../models/movieModel'); // Add .js extension if required

// Fetch all movies with pagination, filtering, and sorting
const getMovies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      genre,
      rating,
    } = req.query;

    const query = {
      ...(genre && { genre }),
      ...(rating && { rating: { $gte: rating } }),
    };

    const movies = await Movie.find(query)
      .sort({ releaseYear: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Movie.countDocuments(query);
    return res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      movies,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch a single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a new movie
const addMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('releaseYear').isNumeric().withMessage('Release Year must be a number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const movie = new Movie(req.body);
      await movie.save();
      return res.status(201).json(movie);
    } catch (error) {
      console.error('Error adding movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
];

// Update an existing movie
const updateMovie = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('director').optional().notEmpty().withMessage('Director is required'),
  body('releaseYear').optional().isNumeric().withMessage('Release Year must be a number'),
  body('genre').optional().notEmpty().withMessage('Genre is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      return res.status(200).json(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
];

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};