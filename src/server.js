require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./users/routes");
const spotifyRouter = require("./spotify/routes.js");
const {trackRouter} = require("./local/routes");
const {playlistRouter} = require("./local/routes");

const User = require("./users/model");
const LocalTracks = require("./local/models/LocalTracks");
const LocalPlaylists = require("./local/models/LocalPlaylists");
const LocalPlaylistTracks = require("./local/models/LocalPlaylistTracks");

const port = process.env.PORT || 5001;
console.log("localPlaylist", LocalPlaylists);
User.hasMany(LocalPlaylists);
LocalPlaylists.belongsTo(User);
LocalPlaylists.hasMany(LocalPlaylistTracks);
LocalTracks.hasMany(LocalPlaylistTracks);
LocalPlaylistTracks.belongsTo(LocalPlaylists);
LocalPlaylistTracks.belongsTo(LocalTracks);

//following function change to async to work around locking problems
const syncTables = async () => {
    await User.sync({ alter: true });
    await LocalTracks.sync({ alter: true });
    await LocalPlaylists.sync({ alter: true });
    await LocalPlaylistTracks.sync({ alter: true });
};

const app = express()
  .use(express.json())
  .use(cors())
  .use(userRouter)
  .use(spotifyRouter)
  .use(trackRouter)
  .use(playlistRouter)

app.get("/health", (_, res) => {
  res.status(200).json({ message: "API is online" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});
