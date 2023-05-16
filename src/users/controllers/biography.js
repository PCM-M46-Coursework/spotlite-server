const User = require("../model");

const biography = async (req, res) => {
	try {
		const { biography } = req.body;
        
        if(!req.authUser) {
            return res.status(404).json({ message: "User not found" });
        }

        //update bio
        req.authUser.biography = biography;
        await req.authUser.save();
		res.status(200).json({
			message: "successfully updated biography",
			biography: req.authUser.biography
			});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = biography;
