const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/authenticateUser");
const checkRequired = require("../middleware/checkRequired");

const userBooksRouter = require("./userBooksRouter");

//route: /user/register
userRouter.post("/register",
  checkRequired(["userName", "password"]),
  userController.register
);

//route: /user/login
userRouter.post("/login",
  checkRequired(["userName", "password"]),
  userController.login
);

//route: /user/changepassword
userRouter.post("/changepassword",
  authenticateUser,
  checkRequired(["password"]),
  userController.changePassword
);

//route: /user/logout
userRouter.get("/logout", authenticateUser, userController.logout);

// user books router
userRouter.use("/books",userBooksRouter);


module.exports = userRouter;
