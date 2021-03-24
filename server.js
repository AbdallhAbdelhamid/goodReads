const config = require("./config.json");

const express = require("express");
const mongoose = require("mongoose");

// init db
require('./dbInit').run()

// run server
const app = express();

const bookRouter = require('./routers/bookRouter');




app.use('/book',bookRouter);






//start listening
app.listen(config.port, () =>
  console.log(`Listening on port ${config.port} ...`)
);



