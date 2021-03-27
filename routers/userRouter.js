const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");
const checkRequired = require("../middleware/checkRequired");


userRouter.post("/register", 
checkRequired(["userName", "password"]),
userController.register,
);

userRouter.post("/login",
checkRequired(["userName","password"]),
userController.login
);

// get users favourite books
userRouter.get("/books",authenticateUser,userController.getBooks);

userRouter.post("/books/:id",authenticateUser,userController.addBook)

module.exports = userRouter
