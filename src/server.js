require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./users/routes");
const spotifyRouter = require("./spotify/routes.js");
const User = require("./users/model");
const port = process.env.PORT || 5001;

const syncTables = () => {
	User.sync( {alter: true} );
};

const app = express()
	.use(express.json())
	.use(cors())
	.use(userRouter)
	.use(spotifyRouter);

app.get("/health", (_, res) => {
	res.status(200).json({ message: "API is online" });
});

app.listen(port, () => {
	syncTables();
	console.log(`Server is running on port ${port}`);
});
