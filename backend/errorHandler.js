const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  
  module.exports = errorHandler;