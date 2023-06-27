# Week 11/12 - SpotLite - Full Stack MERN Web Application

**Authors:**
 - Andy Harper
 - Beth Nugent
 - Miguel Acevedo
 - Peter C. Matthews
 - Ramon Merrell

This repository contains the Express Server for our coursework submission for Weeks 11, and 12 of the [Master Coding](https://wearecodenation.com/2022/04/25/master-coding/) course at *CodeNation*. The React Client repository can be found here: [https://github.com/PCM-M46-Coursework/spotlite-client](https://github.com/PCM-M46-Coursework/spotlite-client).

For purposes of marking, and invigilation, the site is hosted on [Netlify](https://loquacious-biscotti-76030d.netlify.app/).

## Brief

**Overview:**

For the next 2 weeks you will be working on a full stack MERN application, combining everything you have learnt over the past 12 weeks.

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

 - MongoDB - document database – If your group wishes you can use SQL with Sequelize as your database.
 - Express(.js) - the premier JavaScript web server.
 - Node(.js) - Node.js web framework. 
 - React(.js) - a client-side JavaScript framework.
 - Your group may also use any npm packages or any other Technologies you wish.
 - Your group should also use GitHub, and Trello (or similar) effectively.

 ### Minium Requirements

 **Front End**
 
 Your front end must be built with React and have the following components:
 
 - A login and sign-up page.
 - A manual log out button. That once pressed should display or redirect back to the login page / component
 - Once logged in have a component or page that displays dynamic information about that user, for example their username or email.
 - Once logged in successfully display a response from a free API for example the IMDb API – (Only show this if a user has logged in correctly).
 - A component or page that displays all the registered users on your app.
 - A component or page that allows a user to update their username, password and email.
 - A button so a user can delete their account.
 - Nicely styled and have some thought to styling and UX/UI design.

**Back End**

Your REST API must be built using Node, Express and have a database layer with routes, middleware and controllers to handle all the CRUD operations.

 - Login – use password hashing and generate JWT tokens where appropriate.
 - Sign Up – use password hashing and generate JWT tokens where appropriate.
 - Update user information – use password hashing and generate JWT tokens where
appropriate.
 - List users – use password hashing and generate JWT tokens where appropriate.
 - Delete a user and generate JWT tokens where appropriate.

**Stretch Goals**
 - Project all your API routes using JWT Tokens.
 - Your application must also be hosted on Netlify and Render (or similar).
 - Persistent login using JWT tokens.

## Implementation

SpotLite is a full stack MERN web application that uses the Spotify Web API to allow users to search for, and stream music on our site. Users can create an account, so that they save their favourite artists, and genres. With persistent login, using cookies and JWT tokens, users can easily access their saved artists and genres, and quickly find and play their favourite music.

### Minimal Viable Product

Our MVP is a fully functional web application that provides users with a seamless experience for discovering, and listening to their favourite music on our site. The specific functionality should be as follows:

**User Management**
 - [x] The user should be able to register a new account, with username, email, and password.
 - [x] The user should be able to manually log in, and out of the website.
 - [x] The user should be able to view a profile page, with information about their account.
 - [x] The user should be able to see a list of all registered users.
 - [x] The user should be able to update their username.
 - [x] The user should be able to update their email address.
 - [x] The user should be able to change their password.
 - [x] The user should be able to delete their account.
 - [x] The user's password should be secured, using bcrypt salted hashing.
 - [x] Persistent authorisation should be available via a JSON web token, within a cookie.
 - [x] The JSON web token cookie should be removed when the user logs out.

**Persistence**
 - [x] All user information should be stored within a relational MySQL database.
 - [x] The production database should be hosted on Railway.
 - [x] The development databases should be hosted on Clever Cloud.
 - [x] The connection string should be secured within a `.env` file, for local development.
 
**RESTful API**
 - [x] Each model should have a corresponding router.
 - [x] Each route should have a corresponding controller.
 - [x] Authorised routes should be protected by the `verifyToken` middleware.
 - [x] Middleware should be used, where needed.
 - [x] All routes should be fully tested with Thunder Client.
 
 **User Routes**
 
| Name | Route | Method | Middleware | Controller |
|------|-------|--------|------------|------------|
| Login | `/users/login` | `POST` | `comparePassword` | `login` |
| Register | `/users/register` | `POST` | `hashPassword` | `register` |
| Dynamic Update | `/users/update` | `PATCH` | `verifyToken` | `dynamicUpdate` |
| Change Password | `/users/change-password` | `PATCH` | `comparePassword`, `verifyToken`, `changePassword` | `dynamicUpdate` |
| Get All Users | `/users/get-all-users` | `GET` | `verifyToken` | `getAllUsers` |
| Auth Check | `/users/auth-check` | `GET` | `verifyToken` | `login` |
| Delete User | `/users/delete` | `DELETE` | `verifyToken` | `delete` |

**Middleware**
 - [x] `verifyToken` - This middleware function will check if a user is authorised before allowing them to access a protected route.
 - [x] `generateToken` - This middleware function will generate a JWT token for the user when they log in.
 - [x] `hashPassword` -  This middleware function will hash the user's password before storing it in the database.
 - [x] `comparePassword` - This middleware function will compare the 
user's entered password with the hashed password stored in the database.
 - [x] `changePassword` - This middleware function will hash the user's new password, and ensure the passwords are different, before storing it in the database.

**User Experience**
 - [x] The website should display the user's username, when logged in.
 - [x] The website should have a logo.
 - [x] The website should have a consistent layout, including typography.
 - [x] The website should have a consistent colour scheme.

**Spotify Web API**
 - [x] The user should be able to search for music by track.
 - [x] The user should be able to listen to a selected song, via an embedded media player.
 - [x] The user should be able to save a track to their list of favourites.
 - [x] The user's favourites should be displayed to them, when they log in.
 - [x] The Spotify Web API should be validated whenever the user logs in.
 - [x] The Spotify Web API authorisation token should be refreshed before it expires.
 - [x] The refresh token should be stored within a cookie.
 - [x] The refresh token cookie should be removed when the user logs out.

### Stretch Goals

We have also been able to incorporate the following features to the project:

**User Management**
 - [x] The user's password should meet minimum strength requirements.
 - [x] The user's username should meet validation requirements.
 - [x] The user's email address should meet validation requirements.
 - [x] The user should be able to complete a user profile.
 - [x] The user should be able to upload a profile picture.
 - [x] The user should have a `role`, that determines their authorisation level.
 - [x] Only users with the `admin` role should be able to view the email addresses of registered users.

**Middleware:**
 - [x] `validateUsername` - This middleware function will ensure that a user's username meets minimum requirements, before registering the account.
 - [x] `validateEmailAddress` - This middleware function will ensure that a user's email address meets minimum requirements, before registering the account.
 - [x] `validatePassword` - This middleware function will ensure that a user's password meets minimum strength requirements, before registering the account.

**Spotify Web API**
 - [x] The user should be able to search for music by genre.
 - [x] The user should be able to search for music by artist.
 - [x] The user should be able to search for music by playlist.
 - [x] The user should be able to save a track to their list of favourites.
 - [x] The user should be able to open a song in a new tab, on the official Spotify website.

**User Experience**
 - [x] The website should be made responsive, for desktop, tablet, and mobile users.
 - [x] The user should be shown a message when errors occur, while registering to the site.
 - [x] The user should be shown a message when errors occur, while logging in to the site.
 
 **Offline Media Player**
 - [x] The user should be able to listen to MP3 and OGG files, hosted on their local device.
 - [x] The user should be able to see a spectrum analyser visualisation of their music, as it plays.
 
 ### Further Stretch Goals
 - [ ] User events should be logged, and tracked, using Google Analytics.
 - [ ] The user should be able to share music to social media.
 - [ ] The website should have multiple colour themes (Light/Dark Mode).
 - [ ] Use MongoDB as an image cache, for album covers, artist images, and profile pictures.
 - [ ] The user should be able to see the lyrics of the song they are listening to.
 - [ ] The user should be able to get recommendations of new artists, based on their favourite artists and genres.
 
 ## Retrospective
 
 We struck two major problems while working on this project. First, we found that the Spotify Web Playback SDK is a premium feature for Spotify users, so we were not able to leverage the ease of use of the full-featured Spotify Media Player. Instead, we have used an embedded `<iframe />` player that only has the basic functionality of play/pause, and track seek. This has meant that a lot of features we wanted to add, so far as Spotify goes, had to be ditched. Also, because of this setback, it meant that producing features for Spotify became a longer procedure, which meant that other stretch goals had to be left behind.
 
 The second major problem was an 11th-hour revelation about a feature being produced for the site. Ramon had worked on a full-stack feature for the site, whereby a user could produce playlists, using music files hosted on their own devices; creating a full music library, within the website. However, it was found that the blob URLs that are created, are only temporary URLs. If they are saved to the database, there is no way to ensure that the URLs will still link to the local file, when the user queries their music library. The back-end code for this feature has been retained within the enhancement branch, `enhancement/localPlaylist-init-rm`.
