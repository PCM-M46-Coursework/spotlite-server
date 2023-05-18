const User = require("../model");

const setAsAdmin = async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.userrole === 'admin') {
        user.userrole = 'user';
      } else {
        user.userrole = 'admin';
      }
  
      await user.save();
  
      res.json({ message: `User '${username}' role updated to ${user.userrole}` });
    } catch (error) {
      res.status(500).json({ message: "Error" , error: error.message });
    }
  };
  
  module.exports = setAsAdmin