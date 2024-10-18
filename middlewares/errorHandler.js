const errorHandler = (err, req, res) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;