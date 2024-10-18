const Movie = require('../models/Movie');
const { body, validationResult } = require('express-validator');

// Fetch all movies with pagination, filtering, and sorting
const getMovies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, genre, rating } = req.query;
    const query = {};
    
    if (genre) {
      query.genre = genre;
    }
    
    if (rating) {
      query.rating = { $gte: rating }; // Filter by rating
    }

    const movies = await Movie.find(query)
      .sort({ releaseYear: 1 }) // Assuming releaseYear is the field for the year of release
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Movie.countDocuments(query);
    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      movies,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch a single movie by ID
const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

// Add a new movie
const addMovie = [
  body('title').notEmpty().withMessage('Title is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('releaseYear').isNumeric().withMessage('Release Year must be a number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },
];

// Update an existing movie
const updateMovie = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('director').optional().notEmpty().withMessage('Director is required'),
  body('releaseYear').optional().isNumeric().withMessage('Release Year must be a number'),
  body('genre').optional().notEmpty().withMessage('Genre is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  },
];

// Delete a movie
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};