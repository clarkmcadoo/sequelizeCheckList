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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use("/", express.static("./public"));

app.get("/", function(require, response) {
  models.todo
    .findAll()
    .then(function(foundItems) {
      response.render("index", { todo: foundItems });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

//gets called by the Add Task button
app.post("/addTodo", function(require, response) {
  //selector for the add task input box value
  var newTodo = require.body.todo;
  //check if a value is entered in input box
  if (newTodo.length != 0) {
      console.log('item was not undefined'+ newTodo);
    //create a new todo list item  
    var newItem = models.todo.build({ item: newTodo, completed: false });
    newItem.save().then(function(savedTodo) {}).catch(function(err) {
      response.status(500).send(err);
    });
  } else {
    return response.redirect("/");
  }
  return response.redirect("/");
});



//gets called by the Complete button
app.post("/completeTodo", function(require, response) {
  //selector that gets the value of the complete button clicked
  var itemToUpdateId = require.body.complete;
  //calls update on the table, whenere the id = itemToUpdateId, then let's redirect to the index base page
  models.todo
    .update(
      {
        completed: true
      },
      {
        where: {
          id: itemToUpdateId
        }
      }
    )
    .then(function() {
      return response.redirect("/");
    });
});

app.post("/deleteComplete", function(require, response) {
  //selector that gets the value of the complete button clicked
  var itemToDelete = require.body.delete;
  //calls update on the table, whenere the id = itemToUpdateId, then let's redirect to the index base page
  models.todo
    .destroy(
      {
where: {
          id: itemToDelete
        }
      }
    )
    .then(function() {
      return response.redirect("/");
    });
});

app.listen(port, function() {
  console.log("You are running the check-list app on port:", port);
});
