const config = require("./config.json");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// routers
const bookRouter = require("./routers/bookRouter");
const userRouter = require("./routers/userRouter");

// run server
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Map routers
app.use("/book", bookRouter);
app.use("/user", userRouter);

// Error handler
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

// ! Why does it listen before initalizing the db?
// init db and start listening
require("./dbInit")
  .run()
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Listening on port ${config.port} ...`)
    );
  });
