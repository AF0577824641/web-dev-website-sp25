const express = require("express");
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.js");
const authorsRouter = require("./routes/authors.js");
const booksRouter = require("./routes/books.js");
const genresRouter = require("./routes/genres.js");
const bodyParser = require("body-parser");

var handlebars = require("express-handlebars").create({
  helpers: {
    //normal equals to compare 2 values
    eq: (v1, v2) => v1 == v2,
    ne: (v1, v2) => v1 != v2, //normal not equals to compare 2 values
    //less then to compare 2 values
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2, //greater then to compare 2 values
    lte: (v1, v2) => v1 <= v2, //less then or equal to to compare 2 values
    gte: (v1, v2) => v1 >= v2, //greater then or equal to to compare 2 values
    and() {
      //will return true if each element in the array is true
      return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
      //will return true if at least one element in the array is true
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    //given an id and list of objects, check if there is an object has that given id
    someId: (arr, id) => arr && arr.some((obj) => obj.id == id),
    in: (arr, obj) => arr && arr.some((val) => val == obj), //check if an element is in an array
    dateStr: (v) => v && v.toLocaleDateString("en-US"), //a helper function to display dates
  },
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);

// Home
app.use("/", function (req, res, next) {
  res.send("<h1>Hello BookedIn</h1>");
});

// custom 404 page
app.use((_, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

// custom 500 page
app.use((err, _, res) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; press Ctrl-C to terminate.`
  )
);
