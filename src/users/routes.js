const { Router } = require("express");
const userRouter = Router();
const controllers = require("./controllers");
const middleware = require("../middleware");

userRouter.post(
	"/users/login",
	middleware.comparePassword,
	middleware.generateToken,
	controllers.login,
);

userRouter.post(
	"/users/register",
	middleware.hashPassword,
	middleware.generateToken,
	controllers.register,
);

userRouter.patch(
	"/users/update",
	middleware.verifyToken,
	controllers.dynamicUpdate,
);
userRouter.patch(
	"/users/change-password",
	middleware.verifyToken,
	middleware.changePassword,
	middleware.generateToken,
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
	"/users/delete/:id",
	middleware.verifyToken,
	controllers.delete,
);

module.exports = userRouter;
