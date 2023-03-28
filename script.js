const cardsContainer = document.querySelector(".cards-container");
const newBookModal = document.querySelector("#new-book-modal");
const newBookBtn = document.querySelector(".new-book-btn");
const addNewBookBtn = document.querySelector("button[type=submit]");
const bookForm = document.querySelector(".new-book-form");

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

function addBookToLibrary(title, author, numPages, status) {
  const newBook = new Book(title, author, numPages, status);
  myLibrary.push(newBook);
}

function clearDisplay() {
  // Clear all book cads except new book button
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((book) => {
    book.parentNode.removeChild(book);
  });
}

function displayLibrary() {
  clearDisplay();

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-card", "card");

    const bookProperties = Object.keys(book);

    bookProperties.forEach((property) => {
      const element = document.createElement("p");
      element.innerHTML = book[property];
      bookElement.appendChild(element);
    });

    cardsContainer.insertBefore(bookElement, cardsContainer.firstChild);
  });
}

function getData(form) {
  const formDataObj = Object.fromEntries(new FormData(form));

  const formValues = Object.values(formDataObj);
  addBookToLibrary(...formValues);
}

newBookBtn.onclick = () => {
  newBookModal.showModal();
};
addNewBookBtn.onclick = () => {
  newBookModal.close();
};

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(e.target);
  displayLibrary();
  bookForm.reset();
});
window.addEventListener("load", displayLibrary);
