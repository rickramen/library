const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Reset on display update
  
    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
  
      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.hasRead ? 'Yes' : 'No'}</p>
        <button onclick="myLibrary[${index}].toggleReadStatus(); displayBooks();">
        ${book.hasRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
        <button onclick="deleteBookFromLibrary(${index})">Remove</button>
      `;
  
      libraryContainer.appendChild(bookCard);
    });
}

function deleteBookFromLibrary(index) {
    myLibrary.splice(index, 1); 
    displayBooks();
}

// Toggle Read status with prototype instance
Book.prototype.toggleReadStatus = function() {
    this.hasRead = !this.hasRead;
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent page reload
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const hasRead = document.getElementById('hasRead').checked;

  addBookToLibrary(title, author, pages, hasRead); 
  closeModal(); 
  document.getElementById('new-book-form').reset();
}

function openModal() {
  document.getElementById('book-modal').showModal();
}

function closeModal() {
  document.getElementById('book-modal').close();
}

// Event listeners
document.getElementById('new-book-btn').addEventListener('click', openModal);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('new-book-form').addEventListener('submit', handleFormSubmit);


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);