const { Router } = require("express");
const userRouter = Router();
const controllers = require("./controllers");
const middleware = require("../middleware");
const multer = require('multer');
const upload = multer();

userRouter.post(
	"/users/login",
	middleware.comparePassword,
	controllers.login,
);

userRouter.post(
	"/users/register",
	middleware.validateUser,
	middleware.validateEmail,
	middleware.validatePass,
	middleware.hashPassword,
	controllers.register,
);

userRouter.patch(
	"/users/update",
	middleware.verifyToken,
	controllers.dynamicUpdate,
);

userRouter.patch(
	"/users/change-password",
	middleware.comparePassword,
	middleware.verifyToken,
	middleware.changePassword,
	controllers.dynamicUpdate,
);

userRouter.get(
	"/users/get-all-users",
	middleware.verifyToken,
	controllers.getAllUsers,
);

userRouter.get(
    "/users/auth-check", 
    middleware.verifyToken, 
    controllers.login
);

userRouter.delete(
	"/users/delete",
	middleware.verifyToken,
	controllers.deleteUser,
);

userRouter.post(
	"/users/biography",
	middleware.verifyToken,
	controllers.biography,
);

userRouter.patch(
	"/users/upload-profile-pic",
	middleware.verifyToken,
    upload.single('image'),
	controllers.uploadProfilePic,
);

userRouter.post(
	"/users/remove-favourite-track",
	middleware.verifyToken,
	controllers.removeFavouriteTrack,
);

userRouter.post(
	"/users/add-favourite-track",
	middleware.verifyToken,
	controllers.addFavouriteTrack,
);

userRouter.patch(
	"/users/setrole",
	controllers.setAsAdmin,
);

module.exports = userRouter;
