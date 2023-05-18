const jwt = require("jsonwebtoken");

function createReturnObject(user) {
	return {
		message: "success",
		user: {
			username: user.username,
			email: user.email,
			biography: user.biography,
			profilePic: user.profilePic?.toString() ?? null,
			token: user.token,
			favouriteTracks: user.FavouriteTracks.map(t => {
				return { uri: t.uri, albumUrl: t.albumUrl, title: t.title, artist: t.artist };
			}),
		},
	};
}

const login = async (req, res) => {
	try {
		if (req.authUser) {
			console.log(req.authUser);
			res.status(200).json(createReturnObject(req.authUser));
			return;
		}
		req.user.token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
		res.status(200).json(createReturnObject(req.user));
	} catch (error) {
		res.status(501).json({ errorMessage: error.message, error: error });
	}
};

module.exports = login;
