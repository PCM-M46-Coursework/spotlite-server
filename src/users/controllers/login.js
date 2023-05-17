const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	try {
		if (req.authUser) {
			console.log(req.authUser);
			res.status(200).json({
				message: "success",
				user: {
					username: req.authUser.username,
					email: req.authUser.email,
					biography: req.authUser.biography,
					profilePic: req.authUser.profilePic?.toString() ?? null,
					token: req.authUser.token,
				},
			});
			return;
		}

		const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
		res.status(200).json({
			message: "success",
			user: {
				username: req.user.username,
				email: req.user.email,
				profilePic: req.user.profilePic?.toString() ?? null,
				biography: req.user.biography,
				token: token,
			},
		});
	} catch (error) {
		res.status(501).json({ errorMessage: error.message, error: error });
	}
};

module.exports = login;
