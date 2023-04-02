const cardsContainer = document.querySelector(".cards-container");
const newBookModal = document.querySelector("#new-book-modal");
const newBookBtn = document.querySelector(".new-book-btn");
const bookForm = document.querySelector(".new-book-form");

class Book {
  constructor(title = "", author = "Unknown", numPages = 1, status = false) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
  }

  changeStatus() {
    this.status = !this.status;
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

function deleteBook(book) {
  const bookIndex = book.dataset.index;
  myLibrary.splice(bookIndex, 1);
  displayLibrary();
}

function addDeleteEvent() {
  const btns = document.querySelectorAll(".delete-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteBook(btn.parentElement);
    });
  });
}

function displayLibrary() {
  clearDisplay();

  let countIndex = 0;
  myLibrary.forEach((book) => {
    // create the book node
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-card", "card");

    const titleElement = document.createElement("p");
    const authorElement = document.createElement("p");
    const pagesElement = document.createElement("p");
    const statusElement = document.createElement("p");

    titleElement.innerHTML = book.title;
    titleElement.setAttribute("data-info", "title");

    authorElement.innerHTML = book.author;
    authorElement.setAttribute("data-info", "author");

    pagesElement.innerHTML = `${book.numPages} pages`;
    pagesElement.setAttribute("data-info", "pages");

    statusElement.innerHTML = book.status ? "Read" : "Not Read";
    statusElement.setAttribute("data-info", "status");

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(pagesElement);
    bookElement.appendChild(statusElement);

    // set Index of book
    bookElement.setAttribute("data-index", countIndex);
    countIndex += 1;

    // append clear btn
    const clearBtnTemplate = document.getElementsByTagName("template")[0];
    const clearBtnClone = clearBtnTemplate.content.cloneNode(true);
    bookElement.appendChild(clearBtnClone);

    // add book to container
    cardsContainer.insertBefore(bookElement, cardsContainer.firstChild);
  });

  addDeleteEvent();
}

function getData(form) {
  const formDataObj = Object.fromEntries(new FormData(form));

  const formValues = Object.values(formDataObj);
  addBookToLibrary(...formValues);
}

newBookBtn.onclick = () => {
  newBookModal.showModal();
};

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(e.target);
  displayLibrary();
  bookForm.reset();
  newBookModal.close();
});
window.addEventListener("load", displayLibrary);
