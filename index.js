
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var processor = require('./TextProcessing.js');
var sentimentor = require('./sentimentAnalyzer.js');
var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']})

// Create server
var staticPort = 3000;
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
}).listen(staticPort)
console.log('Static server at http://localhost:' + staticPort)
// server connection

// Data server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json()

app.use(function middleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post('/receiver', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  //console.log("post", req.body);
  res.writeHead(200, {'Content-Type': 'application/json'});
  var message = req.body.data;
  var sentiment = sentimentor.sentimentAnalyzer(message, function(val){
    var response = processor.TextProcessing(message);
    console.log(val);
    response.finalNode = val;
    res.end(JSON.stringify(response));
  });
  /*
  var sentiment = sentimentor.sentimentAnalyzer(message);
  setTimeout(function(){
    var response =  processor.TextProcessing(message);
    console.log(sentiment);
    response.finalNode = sentiment;
    res.end(JSON.stringify(response));
  }, 2000);
*/

})

var dataPort = staticPort+1;
app.listen(dataPort);
console.log('Data server at http://localhost:' + dataPort)
