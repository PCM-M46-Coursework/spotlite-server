const User = require("../model");

const deleteUser = async (req, res) => {
    try{
        console.log(req.body)

        const deleteUser = await User.destroy({ where: { username: req.body.username } });

        res.status(201).json({ message: "success", deleteUser: deleteUser });
    } catch (error) {
      res.status(501).json({ errorMessage: error.message, error: error });
    }        
}

module.exports =
deleteUser;