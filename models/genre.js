const genres = [
  {
    name: "Science Fiction",
    description:
      "Fiction dealing with advanced technology and space exploration",
  },
  {
    name: "Fantasy",
    description: "Fiction with magical or supernatural elements",
  },
  {
    name: "Mystery",
    description: "Fiction centered around solving a crime or mysterious event",
  },
];
exports.all = genres;
exports.get = (idx) => {
  return genres[idx];
};
exports.add = (genre) => {
  genres.push(genre);
};

exports.update = (genre) => {
  genres[genre.id] = genre;
};

exports.updateAtIndex = (idx, genre) => {
  genres[idx] = genre;
};

exports.upsert = (genre) => {
  if (genre.id) {
    exports.update(genre);
  } else {
    exports.add(genre);
  }
};
