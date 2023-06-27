const bcrypt = require("bcrypt");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPassword = async (req, res, next) => {
	try {
		if (req.body && req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, saltRounds);
		}
		next();
	} catch (error) {
		res.status(501).json({ errorMessage: error.message, error: error });
	}
};

module.exports = hashPassword;
