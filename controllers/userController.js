const mongoose = require("mongoose");
const User = require("../models/User");
const ErrorData = require("../ErrorData");
const Book = require("../models/book");

const register = async (req, res, next) => {
  try {

    let newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
    });

    await newUser.save();
    res.statusCode = 201;
    res.send("Registered!");

  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error.ValidationError)
      return next(ErrorData.notAcceptableError(err.message));

    return next(ErrorData.internalServerError);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) next(ErrorData.unauthorizedError("Invalid user name or password"))

    const isMatch = await user.verifyPassword(req.body.password);

    if (!isMatch) next(ErrorData.unauthorizedError("Invalid user name or password"))

    const token = await user.createToken();

    //todo: save token in header
    res.send(`Welcome back ${user.userName} !`);
  } catch (err) {

    console.log(err);
    return next(ErrorData.unauthorizedError(err.message));

  }
};

const getBooks = async (req, res, next) => {
  try {
    let user = await req.user;
    let { favorites } = await User.findById(user._id).populate("favorites");
    res.send(favorites);
  } catch (err) {
    return next(ErrorData.internalServerError);
  }
};

const addBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    let user = req.user;
    if (!book) return next(ErrorData.notFoundError());

    user.favorites.push(book._id);

    await user.save();

    res.statusCode = 201; // created
    res.send("book added!");
  } catch (err) {
    return next(ErrorData.internalServerError);
  }
};

module.exports = {
  register,
  login,
  getBooks,
  addBook,
};
