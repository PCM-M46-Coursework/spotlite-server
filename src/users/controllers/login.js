const User = require("../model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	try {
		if (req.authUser) {
			res.status(200).json({
				message: "success",
				user: {
					username: req.authUser.username,
					email: req.authUser.email,
				},
			});
			return;
		}

		const token = await jwt.sign(
			{ id: req.user.id },
			process.env.SECRET_KEY,
		);
		res.status(200).json({
			message: "success",
			user: {
				username: req.body.username,
				email: req.body.email,
				token: token,
			},
		});
	} catch (error) {
		res.status(501).json({ errorMessage: error.message, error: error });
	}
};

module.exports = login;
