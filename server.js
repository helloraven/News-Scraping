var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");


var PORT = 3001;

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/home", function(req, res){
    console.log("we hit the route!");
    res.render("home");
})

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newscraper");

var articleModel = require ("./models/article.js");
articleModel.create({
    title: "Hello first article",
    description: "the first article",
    link: "www.google.com"
}).then (function(thingWeSaved){
    console.log("this is the thing we saved", thingWeSaved)
});

const url = "https://gizmodo.com/";

request(url, function (error, response, body) {
  if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);

      $("h1.headline").each(function(index, title) {
          const articleTitle = $(title).find("a").text();
          const articleSummary = $(title).find("a").attr('href');


          console.log(articleSummary)
      });
  }
});




app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });