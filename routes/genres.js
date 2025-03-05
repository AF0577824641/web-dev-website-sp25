const express = require("express");
const router = express.Router();
const Genre = require("../models/genre");

router.get("/", function (req, res, next) {
  res.render("genres/index", {
    title: "BookedIn || Genres",
    genres: Genre.all,
  });
});

router.get("/form", function (req, res, next) {
  res.render("genres/form", {
    title: "BookedIn || Genres",
    genre: {},
  });
});
router.post("/upsert", async (req, res) => {
  console.log("body: " + JSON.stringify(req.body));
  Genre.upsert(req.body);
  res.redirect(303, "/genres");
});
router.get("/edit", async (req, res, next) => {
  let genreIndex = parseInt(req.query.id);
  let genre = Genre.get(genreIndex);
  if (!genre) {
    return res.status(303).render("error", { error: "Genre not found" });
  }
  genre.id = genreIndex;
  console.log("Editing genre:", genre);
  res.render("genres/form", {
    title: "BookedIn || Genres",
    genre,
    genreIndex,
  });
});
router.get("/show/:id", async (req, res, next) => {
  var templateVars = {
    title: "BookedIn || show",
    genre: Genre.get(req.params.id)
  };
  res.render("genres/show", templateVars);
});

module.exports = router;
