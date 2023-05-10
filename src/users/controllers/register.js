const User = require("../model");

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({ message: "success", user: { username: req.body.username }})
    } catch (error) {
        res.status(501).json({ message: error.message, error: error })
    }
 };