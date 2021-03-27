const User = require("../models/User");
const {unauthorizedError} = require('../ErrorData');

module.exports = async (req,res,next) =>{
    //TODO : Catch better errors :/
    try{
        const authenticationToken = req.headers.authorization;
        if(!authenticationToken) throw new Error("No Authorization Header!");

        const user = await User.getUserFromToken(authenticationToken);
        
        if(!user) throw new Error("Invalid authentication");

        req.user = user;
        next();

    } catch (err) {
        return next(unauthorizedError());
    }
} 