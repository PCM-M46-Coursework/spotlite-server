const User = require("../users/model");

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
  
    const errors = [];
  
    if (!email) {
      errors.push('Email is required.');
    }

    if (email && (email.length < 4 || email.length > 76)) {
      errors.push('Email must be between 4 and 75 characters long.');
    }
    
    if (!email || /\s/.test(email) ) {
        errors.push('Email cannot contain spaces.');
    }
  
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.push('Email contains invalid characters.');
    }

    if (email && !/^(?!.*(?:admin|superuser|support|info)).*$/.test(email)) {
      errors.push('Registration with a role-based email is not allowed.');
    }

    // Database check for uniqueness
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      errors.push('Email is already taken.');
    }

    // Add up errors and display them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    req.validatedData = { email };
  
    next();
  };

module.exports = validateEmail;