require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./users/routes");
const spotifyRouter = require("./spotify/routes.js");
const User = require("./users/model");
const FavouriteTrack = require("./users/FavouriteTrack.model");
const port = process.env.PORT || 5001;

const alterTables = true;

const syncTables = async () => {
	FavouriteTrack.belongsTo(User, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	User.hasMany(FavouriteTrack, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	await FavouriteTrack.sync({ alter: alterTables });
	await User.sync({ alter: alterTables });
};

const app = express().use(express.json()).use(cors()).use(userRouter).use(spotifyRouter);

app.get("/health", (_, res) => {
	res.status(200).json({ message: "API is online" });
});

app.listen(port, () => {
	syncTables();
	console.log(`Server is running on port ${port}`);
});
