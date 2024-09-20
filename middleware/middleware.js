const checkAdminKey = (req, res, next) => {
    const secretKey = req.headers['x-secret-key']; // Using a custom header to pass the key
  
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
      next(); // Allow the request to continue
    } else {
      res.status(403).json({ message: 'Access denied. Invalid secret key.' });
    }
  };
  

  export default checkAdminKey;