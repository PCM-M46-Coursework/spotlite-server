const { Router } = require("express");
const userRouter = Router();
const controllers = require("./controllers");
const middleware = require("../middleware");

userRouter.post(
	"/users/login",
	middleware.comparePassword,
	controllers.login,
);

userRouter.post(
	"/users/register",
	middleware.validateUser,
	middleware.validateEmail,
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

module.exports = userRouter;
