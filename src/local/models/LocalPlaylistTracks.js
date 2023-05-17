const { DataTypes } = require("sequelize");
const connection = require("../../db/connection");

const LocalPlaylistTracks = connection.define("LocalPlaylistTracks", {
  LocalTrackId: {
    type: DataTypes.INTEGER,
  },
  LocalPlaylistId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = LocalPlaylistTracks;
