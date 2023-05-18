const FavouriteTrack = require("../FavouriteTrack.model");

const removeFavouriteTrack = async (req, res) => {
	try {
		await FavouriteTrack.destroy({ where: { uri: req.body.track.uri } });
		res.status(201).json({
			message: "Track removed from favourites.",
		});
	} catch (error) {
		res.status(501).json({ message: error.message, error: error });
	}
};

module.exports = removeFavouriteTrack;
