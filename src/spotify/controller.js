
const jwt = require("jsonwebtoken");
const SpotifyWebAPI = require("spotify-web-api-node");

const login = async (req, res) => {
    try {
      const spotifyAPI = new SpotifyWebAPI({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      });
      const data = await SpotifyWebAPI.authorizationCodeGrant(req.body.code);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    } catch (e) {
      res.sendStatus(400);
    }
  };
  module.exports = {
    login
  };