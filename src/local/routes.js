const trackRouter = require("express").Router();
const playlistRouter = require("express").Router();

const {
  addTrack,
  getTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  addPlaylist,
  getPlaylistsByUserId,
  getTracksByPlaylist,
} = require("./controllers");

trackRouter.post("/tracks/addTrack", addTrack);
trackRouter.get("/tracks/getTracks", getTracks);
trackRouter.post("/tracks/addTrackToPlaylist", addTrackToPlaylist);
trackRouter.post("/tracks/removeTrackFromPlaylist", removeTrackFromPlaylist);

playlistRouter.post("/playlists/addPlaylist", addPlaylist);
playlistRouter.get("/playlists/getPlaylistsByUserId", getPlaylistsByUserId);
playlistRouter.get("/playlists/getTracksByPlaylist", getTracksByPlaylist);

module.exports = { trackRouter, playlistRouter };
