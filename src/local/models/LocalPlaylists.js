const { DataTypes } = require("sequelize");
const connection = require("../../db/connection");

const LocalPlaylists = connection.define("LocalPlaylists", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = LocalPlaylists;
