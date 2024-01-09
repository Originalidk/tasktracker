module.exports = () => {
    return (req, res, next) => {
      // Modify req.body or perform transformations as needed
      if (req.body && req.body.data && req.body.data.attributes) {
        // Transform the payload if needed
        req.body = req.body.data.attributes;
      }
  
      // Continue with the next middleware or route handler
      next();
    };
  };