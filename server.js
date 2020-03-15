// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// https://curse-arrow.hyperdev.space/api/timestamp/2015-12-15
// functions {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}

// your first API endpoint...

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    date: date.toUTCString()
  });
});

app.get("/api/timestamp/:date_str", function(req, res) {
  const date_str = req.params.date_str;

  let date = new Date(date_str);

  if (date.toString() === "Invalid Date") {
    date = new Date(parseInt(date_str));
  }

  if (date.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date"
    });
  } else {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
