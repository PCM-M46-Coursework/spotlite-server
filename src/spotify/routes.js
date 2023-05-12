const { Router } = require("express");
const spotifyRouter = Router();
const { login, refresh } = require("./controllers");

spotifyRouter.post("/spotify/login", login);

spotifyRouter.post("/spotify/refresh", refresh);

module.exports = spotifyRouter;
