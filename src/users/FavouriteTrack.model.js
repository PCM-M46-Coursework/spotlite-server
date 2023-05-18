const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const attributes = {
	uri: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	albumUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	artist: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
};

const FavouriteTrack = connection.define("FavouriteTrack", attributes);
module.exports = FavouriteTrack;
