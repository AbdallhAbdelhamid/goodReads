const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');


const userBooksRouter = express.Router();
const userBooksController = require('../controllers/userBooksController')


//route: /user/books
// get users favorite books
userBooksRouter.get("/", authenticateUser, userBooksController.getBooks);

// add new book to favorites
//route: /user/books/bookId
userBooksRouter.post("/:id", authenticateUser, userBooksController.addBook);

// remove book from favorites
//route: /user/books/bookId
userBooksRouter.delete("/:id", authenticateUser, userBooksController.removeBook);

module.exports = userBooksRouter;
