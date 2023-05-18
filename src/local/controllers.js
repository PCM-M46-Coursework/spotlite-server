const LocalTracks = require("./models/LocalTracks");
const LocalPlaylists = require("./models/LocalPlaylists");
const LocalPlaylistTracks = require("./models/LocalPlaylistTracks");
const connection = require("../db/connection");

const addTrack = async (req, res) => {
  try {
    const newTrack = await LocalTracks.create({
      path: req.body.path,
      filename: req.body.filename,
    });
    if (!newTrack) throw new Error("Track creation error");
    res.status(201).send(newTrack);
  } catch (error) {
    res.status(501).send(error);
  }
};
const addPlaylist = async (req, res) => {
  try {
    const newPlaylist = await LocalPlaylists.create({
      name: req.body.name,
      UserId: req.body.UserId,
    });
    if (!newPlaylist) throw new Error("Playlist creation error");
    res.status(201).send(newPlaylist);
  } catch (error) {
    res.status(501).send(error);
  }
};
const getTracks = async (req, res) => {
  try {
    const ourURL = new URL("http://localhost" + req.url);
    console.log("URL", ourURL);
    let UserId = ourURL.searchParams.get("UserId");
    console.log("userId", UserId);

    let SQL =
      "SELECT `LocalTracks`.`path` AS `path`,`LocalTracks`.`filename` AS `trackName`,`LocalPlaylists`.`name` AS `playlistName`" +
      "FROM ((`LocalTracks` JOIN `LocalPlaylistTracks` ON ((`LocalTracks`.`id` = `LocalPlaylistTracks`.`LocalTrackId`))) " +
      "JOIN `LocalPlaylists` ON ((`LocalPlaylists`.`id` = `LocalPlaylistTracks`.`LocalPlaylistId`)))" +
      "WHERE (`LocalPlaylists`.`UserId` = " +
      UserId +
      ")" +
      "ORDER BY `LocalTracks`.`filename` ASC";

    const tracks = await connection.query(SQL);
    console.log(tracks);
    if (!tracks) throw new Error("Tracks not found");
    const trackList = tracks[0].map((track) => {
      return {
        path: track.path,
        trackName: track.trackName,
        playlistName: track.playlistName,
      };
    });
    res.status(200).send(trackList);
  } catch (error) {
    res.status(501).send(error);
  }
};

const getPlaylistsByUserId = async (req, res) => {
  try {
    const ourURL = new URL("http://localhost" + req.url);
    console.log("URL", ourURL);
    let UserId = ourURL.searchParams.get("UserId");
    console.log("UserID", UserId);

    const playlists = await LocalPlaylists.findAll({
      where: { UserId: UserId },
    });

    if (!playlists) throw new Error("Playlists not found");
    res.status(200).send(playlists);
  } catch (error) {
    res.status(501).send(error);
  }
};

const getTracksByPlaylist = async (req, res) => {
  try {
    const ourURL = new URL("http://localhost" + req.url);
    let playlistId = ourURL.searchParams.get("playlistId");
    console.log("playlistId", playlistId, req.url);

    let SQL =
    "SELECT `LocalTracks`.`id` AS `id`, `LocalTracks`.`path` AS `path`,`LocalTracks`.`filename` AS `trackName`,`LocalPlaylists`.`name` AS `playlistName`" +
    "FROM ((`LocalTracks` JOIN `LocalPlaylistTracks` ON ((`LocalTracks`.`id` = `LocalPlaylistTracks`.`LocalTrackId`))) " +
    "JOIN `LocalPlaylists` ON ((`LocalPlaylists`.`id` = `LocalPlaylistTracks`.`LocalPlaylistId`)))" +
    "WHERE (`LocalPlaylists`.`id` = " +
    playlistId +
    ")" +
    "ORDER BY `LocalTracks`.`filename` ASC";

    const tracks = await connection.query(SQL);
    if (!tracks) throw new Error("Tracks not found");
    console.log(tracks);
    const trackList = tracks[0].map((track) => {
      return {
        id:track.id,
        path: track.path,
        trackName: track.trackName,
        playlistName: track.playlistName,
      };
    });
    res.status(200).send(trackList);
  } catch (error) {
    res.status(501).send(error);
  }
};

const addTrackToPlaylist = async (req, res) => {
  try {
    console.log("db recieved", req.body.path, req.body.filename, req.body.playlistId);
    const result = await LocalTracks.findOrCreate({where:{
      path: req.body.path,
      filename: req.body.filename}
    });
    const newTrack = result[0].dataValues;

    console.log("newTrack", newTrack);
    if (!newTrack) throw new Error("Track creation error");
    console.log("TrackID", newTrack.id, "playlistId", req.body.playlistId);
    const newJunction = await LocalPlaylistTracks.create({
      LocalTrackId: newTrack.id,
      LocalPlaylistId: req.body.playlistId,
    });
    if (!newJunction) throw new Error("Junction creation error");

    res.status(201).send(newJunction);
  } catch (error) {
    res.status(501).send(error);
  }
};
const removeTrackFromPlaylist = async (req, res) => {
  try {
    console.log("data", req.body.trackId, req.body.playlistId);
    const deathCount = await LocalPlaylistTracks.destroy(
      {where: {LocalTrackId: req.body.trackId,
      LocalPlaylistId: req.body.playlistId}}
    );
    if (!deathCount) throw new Error("Junction not found");
    res.status(200).send({RecordsDeleted:deathCount});
  } catch (error) {
    res.status(501).send(error);
  }
};

module.exports = {
  addTrack,
  addPlaylist,
  getTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  getPlaylistsByUserId,
  getTracksByPlaylist,
};
