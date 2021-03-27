var express = require("express");

var bookRouter = express.Router();

var bookController = require("../controllers/bookController");
const authenticateUser = require("../middleware/authenticateUser");

//route: /book
bookRouter.get("/", bookController.allBooks);

//route: /book/bookId
bookRouter.get("/:id", bookController.getBook);

//route: /book
bookRouter.post("/", bookController.postBook);

//route: /book
bookRouter.put("/:id", bookController.putBook);

//route: /book/:id
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
