const bcrypt = require("bcrypt");

module.exports = async function (req, res, next) {
	const { password, newPassword } = req.body;

	// Return early if both passwords are not within the request body.
	if (!password || !newPassword) {
		return res.status(422).json({
			message: "Username, password, and new password are all required.",
		});
	}

	try {
		// 1. Hash the new password.
		const newHash = await bcrypt.hash(
			req.body.newPassword,
			parseInt(process.env.SALT_ROUNDS),
		);

		// 2. Ensure new hash is different to the current hash.
		if (newHash == req.body.password)
			return res.status(422).json({
				message:
					"The new password must be different than the old password.",
			});

		// 3. Overwrite the body to contain just the new password hash as "password".
		console.log(newHash)
		req.body = { username: req.body.username, key: "password", value: newHash };

		// 4. Pass the new request body onto the PATCH controller.
		next();
	} catch (error) {
		res.status(500).json({
			message: error.message,
			error,
		});
	}
};
