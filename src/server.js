const express = require("express");
const app = express();
const SpotifyWebAPI = require("spotify-web-api-node");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const spotifyRouter = require("./spotify/route.js");

app.use(cors());
app.use(express.json());
app.use(spotifyRouter);

app.get("/health", (req, res) => {
    res.status(200).json({ message: "App is healthy" });
  });
app.listen(port, () => {
    console.log("Server is listening on port " + port);
  });