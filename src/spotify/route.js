const spotifyRouter = require("express").Router();
const {login} = require("./controller");

spotifyRouter.post("/login", login);

module.exports = spotifyRouter;