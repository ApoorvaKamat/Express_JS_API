//Initialisations and Imports 
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("./config");
var appointmentRouter = require("./routes/appointment");

// Port Definition
var port = 3000;

// App Definitions and uses
var app = express();


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use("/appointments", appointmentRouter);


const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.listen(port, function () {
    console.log("Runnning on " + port);
  });
module.exports = app;



