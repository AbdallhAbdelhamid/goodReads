const config = require("./config.json");

const express = require("express");
const mongoose = require("mongoose");

// require routers
const bookRouter = require('./routers/bookRouter');
const userRouter = require('./routers/userRouter');

// init db
require('./dbInit').run()

// run server
const app = express();

// Middleware
app.use(express.json());

// Map routers
app.use('/book',bookRouter);
app.use('/user',userRouter);


// Error handler
app.use((err,req,res,next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message)
})



//start listening
app.listen(config.port, () =>
  console.log(`Listening on port ${config.port} ...`)
);




