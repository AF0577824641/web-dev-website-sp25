const books = [
  {
    title: "Leviathan Wakes",
    publishingYear: 2011,
    authorIds: ["0", "1"],
    genreIds: [],
  },
  { title: "Caliban's War", publishingYear: 2012, authorIds: [], genreIds: [] },

  {
    title: "Abaddon's Gate",
    publishingYear: 2013,
    authorIds: [],
    genreIds: [],
  },
  { title: "Cibola Burn", publishingYear: 2014, authorIds: [], genreIds: [] },
  { title: "Nemesis Games", publishingYear: 2015, authorIds: [], genreIds: [] },
];

exports.all = books;

exports.get = (idx) => {
  return books[idx];
};

exports.add = (book) => {
  books.push(book);
};

exports.update = (book) => {
  books[book.id] = book;
};

exports.upsert = (book) => {
  if (book.authorIds && !Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.genreIds && !Array.isArray(book.genreIds)) {
    book.genreIds = [book.genreIds];
  }

  if (!book.authorIds) {
    book.authorIds = [];
  }
  if (!book.genreIds) {
    book.genreIds = [];
  }
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
};
