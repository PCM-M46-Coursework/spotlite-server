const FavouriteTrack = require("../FavouriteTrack.model");

const addFavouriteTrack = async (req, res) => {
	try {
		req.body.track.user_id = req.authUser.id;
		console.log("Body:", req.body);
		await FavouriteTrack.create(req.body.track);
		res.status(201).json({
			message: "Track added to favourites.",
		});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = addFavouriteTrack;
