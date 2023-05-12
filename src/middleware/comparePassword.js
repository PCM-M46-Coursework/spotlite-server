const User = require("../users/model");

const bcrypt = require("bcrypt");


const comparePassword = async (req, res, next) => {
    try {
        req.user = await User.findOne({where: {username:req.body.username}});

        if (req.user == null) {
            throw new Error ("password or username doesn't match")
        }
            const comparePassword = await bcrypt.compare(req.body.password, req.user.password)

            if(!comparePassword){
                throw new Error ("password or username doesn't match") 
            }


            next()
    } catch (error) {
        res.status(401).json({errorMessage: error.message, error: error})
    }
};

module.exports = comparePassword;