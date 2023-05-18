const User = require("../users/model");

const validateUser = async (req, res, next) => {
	const { username } = req.body;

	const errors = [];

	if (!username || username.length < 4) {
		errors.push("Username must be at least 4 characters long.");
	}

	if (username && username.length > 13) {
		errors.push("Username must be less than 14 characters long.");
	}

	if (!username || /\s/.test(username)) {
		errors.push("Username cannot contain spaces.");
	}

	if (!username || !/^[\w-]+$/.test(username)) {
		errors.push("Username contains invalid characters.");
	}

	// Database check for uniqueness
	const existingUser = await User.findOne({ where: { username } });
	if (existingUser) {
		errors.push("Username is already taken.");
	}

	// Add up errors and display them
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	req.validatedData = { username };

	next();
};

module.exports = validateUser;
