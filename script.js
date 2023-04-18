const addBookForm = document.getElementById('addBookForm')
var modal = document.getElementById("addBookModal");
var btn = document.getElementById("newBookBtn");
var modalClose = document.getElementsByClassName("btnContainer")[0];

//creating the modal//

document.addEventListener("DOMContentLoaded", function(event) {
 
  btn.onclick = function() {
    addBookForm.reset()
    modal.style.display = "block";
    var input = modal.querySelector("input");
    if (input) {
      input.focus();
    }
  }

  modalClose.onclick = function() {
    modal.style.display = "none";
  }

  document.getElementById("title").focus();

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  const escapeInput = (e) => {
    if (e.key === 'Escape') {
      modal.style.display = "none";
    }
  }
  window.onkeydown = escapeInput

});

//creating a book card//

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function toggleRead(index) {
  myLibrary[index].toggleRead()
  render()
}

function render() {
  let libraryEl = document.querySelector("#library")
  libraryEl.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i]
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "bookCard")
    bookEl.innerHTML = 
      `<div class="cardHeader">
        <div class="btnContainer" onclick="removeBook(${i})">
          <svg width="20px" height="20px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill="#444" d="M15.1 3.1l-2.2-2.2-4.9 5-4.9-5-2.2 2.2 5 4.9-5 4.9 2.2 2.2 4.9-5 4.9 5 2.2-2.2-5-4.9z" class="removeBtn"></path>
          </svg>
        </div>
      </div>
      <div class="cardBody">
        <h3 class="title">${book.title}</h3>
        <p>by</p>
        <h4 class="author">${book.author}</h4>
      </div>
      <div class="cardFooter">
        <p class="pages">${book.pages} pages</p>
        <button class="readBtn ${book.read ? 'read' : 'not-read'}" onclick="toggleRead(${i})">${book.read ? "Read" : "Not Read Yet"} </button>
      </div>`
    libraryEl.appendChild(bookEl);
  }
}

function removeBook (index) {
  myLibrary.splice(index, 1);
  render();
}

function addBooktoLibrary() {
  let title = document.querySelector("#title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value
  let read = document.getElementById("read").checked
  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
  modal.style.display = "none";
  render();
}

document.querySelector("#addBookForm").addEventListener("submit",function (event){
  event.preventDefault();
  addBooktoLibrary();
})