const User = require("../model");

const uploadProfilePic = async (req, res) => {
	try {
		if (req.authUser.username !== req.body.username) {
			throw Error("Cannot update other users");
		}
		const { buffer } = req.file;

		// Serialise the image buffer to store in the database, as a Base64 string.
		const serialisedImage = buffer.toString("base64");

		const dynamicUpdate = await User.update(
			{ profilePic: serialisedImage },
			{ where: { username: req.body.username } },
		);

		res.status(201).json({
			message: "successfully updated",
			dynamicUpdate,
		});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = uploadProfilePic;
