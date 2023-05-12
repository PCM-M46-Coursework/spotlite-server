const SpotifyWebAPI = require("spotify-web-api-node");

// Code = The initial handshake from Spotify that allows us to communicate with them in the first place.
// Access Token = API Key that we need to be able to do anything with Spotify.
// Refresh Token = So we don't need to authenticaticate again, we can just refresh the authorisation.
// Expires In = The number of SECONDS before the access token needs to be refreshed. (3600 = 1 hour)

/*
Authentication and Authorisation

Authentication is the process of verifying the identity of a user, device or system. It answers the question,
"Who are you?". In contrast, authorisation is the process of granting or denying access to a specific resource
or action based on the identity and privileges of the requester. It answers the question, "Are you allowed to do that?".
Authentication ensures that users are who they claim to be, while authorisation determines what actions they are
permitted to perform based on their roles, permissions or other criteria.
*/

/*
{
    "code": "fwsiofejfwoejfgergaegraergaegrawoi"
}
*/
async function login(req, res) {
	try {
		console.log("Spotify Login Controller Reached");
		// These values are held within the .env file. Check Trello if you do not have them.
		const spotifyAPI = new SpotifyWebAPI({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			redirectUri: process.env.SPOTIFY_REDIRECT_URI,
		});

		const data = await spotifyAPI.authorizationCodeGrant(req.body.code);

		res.status(200).json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in,
		});
	} catch (error) {
		console.log(`Spotify Login Error: ${error.message}`);
		res.status(400).json({ message: error.message, error });
	}
}

/*
{
    "refreshToken": "fwsiofejfwoejfwoi"
}
*/
async function refresh(req, res) {
	try {
		console.log("Spotify Refresh Controller Reached");
		const refreshToken = req.body.refreshToken;

		// These values are held within the .env file. Check Trello if you do not have them.
		const spotifyAPI = new SpotifyWebAPI({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			redirectUri: process.env.SPOTIFY_REDIRECT_URI,
			refreshToken,
		});

		const data = await spotifyAPI.refreshAccessToken();
		res.status(200).json({
			accessToken: data.body.access_token,
			expiresIn: data.body.expires_in,
		});
	} catch (error) {
		console.log(`Spotify Refresh Error: ${error.message}`);
		res.status(400).json({ message: error.message, error });
	}
}

module.exports = {
	login,
	refresh,
};
