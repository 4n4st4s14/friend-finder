// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();



//allowing stacitc folder for usage
app.use("/static/", express.static(path.join(__dirname, "app/public")));
// htmlRoutes(app)
// apiRoutes(app)


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))


var PORT = process.env.PORT || 8080;

//app.use(express.static('public'));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function(){
  console.log("App listening on port: " + PORT);

});
