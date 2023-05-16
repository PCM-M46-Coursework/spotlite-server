const User = require("../model");

const biography = async (req, res) => {
	try {
		const { id, biography } = req.body;
        //find user by id
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //update bio
        user.biography = biography;
        await user.save();
		res.status(200).json({
			message: "successfully updated biography",
			biography: user.biography
			});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = biography;
