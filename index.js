// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

//app.get("/api/hello", function (req, res) {
  //res.json({greeting: 'hello API'});
//});

app.get("/api/", function(req, res){
  req.unix = Date.now();
  req.time = new Date(req.unix).toUTCString();
  return res.json({unix: req.unix, utc: req.time});
});

app.get("/api/:time", function(req, res, next){
  console.log(Date.now())
  if(!isNaN(Date.parse(req.params.time))){
    req.unix = Date.parse(req.params.time);
    req.time = new Date(req.unix).toUTCString();
    return res.json({unix: req.unix, utc: req.time});
  }
  else{
    next();
  }
}, function(req, res, next){
  if(!isNaN(req.params.time)){
    req.unix = req.params.time;
    req.time = new Date(parseInt(req.unix)).toUTCString();
    return res.json({unix: parseInt(req.unix), utc: req.time});
  }
  next();
}, function(req, res, next){
  if(req.params.time == ''){
    req.unix = Date.now();
    req.time = new Date(req.unix).toUTCString();
    return res.json({unix: req.unix, utc: req.time});
  }
  next();
},function(req, res){
  res.json({ error : "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
