const User = require("../model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const user = await User.create({
			...req.body,
			userrole: 'user',
		});

		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
		console.log(token);

		res.status(201).json({
			message: "success",
			user: { username: user.username, token: token },
		});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = register;
