const User = require("../model");

const dynamicUpdate = async (req, res) => {
    try {
      const dynamicUpdate = await User.update(
        { [req.body.key]: req.body.value },
        { where: { username: req.body.username } }
      );
  
      res.status(201).json({ message: "successfully updated", dynamicUpdate: dynamicUpdate }); 
    } catch (error) {
      res.status(501).json({ message: error.message, error: error });
    }
  };
  
  module.exports = 
  dynamicUpdate;