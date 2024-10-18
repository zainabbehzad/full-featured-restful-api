const express = require('express');
const Movie = require('../models/movieModel');

const router = express.Router();

// Fetch all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.json(movies); // Added return
  } catch (error) {
    console.error('Error fetching movies:', error);
    return res.status(500).json({ message: 'Error fetching movies' }); // Added return
  }
});

// Fetch a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.json(movie); // Added return
  } catch (error) {
    console.error('Error fetching movie:', error);
    return res.status(500).json({ message: 'Error fetching movie' }); // Added return
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    return res.status(201).json(newMovie); // Added return
  } catch (error) {
    console.error('Error creating movie:', error);
    return res.status(400).json({ message: 'Error creating movie' }); // Fixed quote
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.json(updatedMovie); // Added return
  } catch (error) {
    console.error('Error updating movie:', error);
    return res.status(400).json({ message: 'Error updating movie' }); // Added return
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(204).send(); // No content to return
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ message: 'Error deleting movie' }); // Added return
  }
});

module.exports = router;