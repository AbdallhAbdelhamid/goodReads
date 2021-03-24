const config = require("./config.json");

const express = require("express");
const mongoose = require("mongoose");

const bookRouter = require('./routers/bookRouter');

// init db
require('./dbInit').run()

// run server
const app = express();

// Middleware
app.use(express.json());

// Routers
app.use('/book',bookRouter);


// Error handler
app.use((err,req,res,next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message)
})



//start listening
app.listen(config.port, () =>
  console.log(`Listening on port ${config.port} ...`)
);




