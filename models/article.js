var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    description: String,
    link: String 

});

var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
