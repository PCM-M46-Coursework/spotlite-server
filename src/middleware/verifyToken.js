const User = require("../users/model");

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in request")
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, process.env.SECRET)

        const user = await User.findOne({ where: {id: decodedToken.id}});
        if(!user){
            throw new Error("User is not authorised")
        };
        req.authUser = user

        next();
    } catch (error) {
        res.status(401).json({errorMessage: error.message, error: error})
    }
};

module.exports = verifyToken;

