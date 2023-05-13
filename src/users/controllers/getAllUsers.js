const User = require("../model");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({});

		res.status(201).json({
			message: "success",
			users: users.map(u => {
				return { username: u.username };
			}),
		});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = getAllUsers;
