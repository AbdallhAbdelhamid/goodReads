const User = require("../models/User");
const ErrorData = require("../ErrorData");
const Book = require("../models/book");


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
    if (!book) return next(ErrorData.notFoundError("Book not found"));

    if (user.favorites.includes(book._id))
      return next(
        ErrorData.badRequestError("Book already exists in ur collection")
      );

    user.favorites.push(book._id);

    await user.save();

    res.statusCode = 201; // created
    res.send("book added!");
  } catch (err) {
    return next(ErrorData.internalServerError);
  }
};

const removeBook = async (req, res, next) => {
  try {
    let book = await Book.findOne({ id: req.params.id });

    if (!book)
      return next(ErrorData.notFoundError("Book not found in library"));

    if (!req.user.favorites.includes(book._id))
      return next(ErrorData.notFoundError("Book not found in user favorites"));

    // remove the book id
    req.user.favorites.pull({ _id: book._id }) 

    await req.user.save();

    res.send(`Book with ${book.id} Was removed from your favorites`);
  } catch (err) {
    return next(ErrorData.internalServerError);
  }
};

module.exports = {
  getBooks,
  addBook,
  removeBook
};
