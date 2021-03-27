const mongoose = require("mongoose");
const User = require("../models/User");
const ErrorData = require("../ErrorData");
const Book = require("../models/book");
const cookieParser = require("cookie-parser");

const register = async (req, res, next) => {
  try {
    let newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
    });

    await newUser.save();

    const token = await newUser.createToken();

    res.setHeader("Set-Cookie", `token=${token};httpOnly`);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.send("Registered and logged in!");
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error.ValidationError)
      return next(ErrorData.notAcceptableError(err.message));

    return next(ErrorData.internalServerError());
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user)
      next(ErrorData.unauthorizedError("Invalid user name or password"));

    const isMatch = await user.verifyPassword(req.body.password);

    if (!isMatch)
      next(ErrorData.unauthorizedError("Invalid user name or password"));

    const token = await user.createToken();

    res.setHeader("Set-Cookie", `token=${token};httpOnly`);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.send(`Welcome back ${user.userName} !`);
  } catch (err) {
    return next(ErrorData.internalServerError());
  }
};


const changePassword = async (req,res,next) => {

  try{
    let user = req.user;

    user.password = req.body.password;

    await user.save();

    const token = await user.createToken();

    res.setHeader("Set-Cookie", `token=${token};httpOnly`);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.send("Password changed successfully");
  } catch (err) {
    if(err instanceof mongoose.Error.ValidationError)
      return next(ErrorData.notAcceptableError);

    return next(ErrorData.internalServerError);
  }

}


const logout = async (req,res,next) => {

  try {
    res.setHeader("Set-Cookie",`token='NONE';httpOnly;maxAge:0`);
    res.send('Logged out');
  } catch (err ){
    return next(ErrorData.internalServerError);
  }
}



module.exports = {
  register,
  login,
  changePassword,
  logout
};
