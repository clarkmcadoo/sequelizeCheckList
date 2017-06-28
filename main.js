const express = require("express");
const mustacheExpress = require("mustache-express");
const port = 3000;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const models = require("./models");
var todo = [];
var complete = [];
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use("/", express.static("./public"));


app.get("/", function(require, response){
    response.render("index", {todo: todo});
})

app.post("/", function(require, response){
    var newTodo = require.body.todo;
    todo.push(newTodo);
    response.redirect("/");

})

app.listen(port, function(){
    console.log("You are running the check-list app on port:", port);
});