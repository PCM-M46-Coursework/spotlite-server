const User = require("../users/model");

const validatePass = async (req, res, next) => {
    const { password } = req.body;
  
    const errors = [];
  
    if (!password) {
      errors.push('Password is required.');
    }
    
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters long.');
    }

    if (password && password.length > 20) {
        errors.push('Password must at most 20 characters long.');
    }

    if (!password || /\s/.test(password) ) {
        errors.push('Password cannot contain spaces.');
    }
  
    if (!password || !/^[a-zA-Z0-9]+$/.test(password)) {
      errors.push('Password contains invalid characters.');
    }

    if (password && !/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter, one uppercase letter and one number.');
    }

    // Add up errors and display them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    req.validatedData = { password };
  
    next();
  };

module.exports = validatePass;