// Dependencies
let express = require("express");
let bodyParser = require("body-parser");

let PORT = process.env.PORT || 3000;

let app = express();

// Serve static content from public directory 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import Routes
let routes = require("./controllers/burger_controller.js");

app.use(routes);

// Start server listening 
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
  