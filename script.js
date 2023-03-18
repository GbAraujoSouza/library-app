class Book {
  constructor(title = '', author = '', numPages = 0, hasRead = false) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
  }
}

const myLibrary = [
  new Book('harry potter', 'JK Rolling', 100, false),
  new Book('Elantris', 'Unknown', 500, true),
  new Book('The Handsmaid\'s tale', 'Margaret Atwood', 300, true),
];


function addBookToLibrary(title, author, numPages, hasRead) {
  const newBook = new Book(title, author, numPages, hasRead);
  myLibrary.push(newBook);
}

function displayLibrary() {
  console.log(myLibrary);
}
