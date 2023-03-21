const cardsContainer = document.querySelector(".cards-container");

class Book {
  constructor(title = "", author = "", numPages = 0, status = false) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
  }
}

const myLibrary = [
  new Book("harry potter", "JK Rolling", 100, false),
  new Book("Elantris", "Unknown", 500, true),
  new Book("The Handmaid's tale", "Margaret Atwood", 300, true),
];

// function addBookToLibrary(title, author, numPages, status) {
//   const newBook = new Book(title, author, numPages, status);
//   myLibrary.push(newBook);
// }

function displayLibrary() {
  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-card");

    const bookProperties = Object.keys(book);

    bookProperties.forEach((property) => {
      const element = document.createElement("p");
      element.innerHTML = book[property];
      bookElement.appendChild(element);
    });

    cardsContainer.appendChild(bookElement);
  });
}

window.addEventListener("load", displayLibrary);
