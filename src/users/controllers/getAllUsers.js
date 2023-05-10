const User = require("../model");

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({});
  
      res.status(201).json({ message: "success", users: users });
    } catch (error) {
      res.status(501).json({ message: error.message, error: error });
    }
  };

  module.exports =
  getAllUsers;