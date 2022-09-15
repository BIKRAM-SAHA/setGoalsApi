const errorHandler = (err, req, res, next) => {
  console.log("Error: "+res.statusCode+" "+err.message)
  if (err) {
    res.status(res.statusCode ? res.statusCode : 500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

module.exports = errorHandler