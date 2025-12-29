

const myLibrary = [];

function Book(title, author, pages, read) {

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return myLibrary;
}

addBookToLibrary("hobbit", "me", 20, false);
addBookToLibrary("yefw", "e", 220, true);
console.log(myLibrary);

////////// add and remove button header  AND  dialog ui ////////////////////

const addButton = document.querySelector(".add-btn");
const removeButton = document.querySelector(".remove-btn");

const addDialog = document.getElementById("add-dialog");
const cancelButton = document.querySelectorAll(".cancel-btn");
const selected = document.querySelector("select");
const submitButton = document.getElementById("submit");
const addForm = document.querySelector(".add-form");

addButton.addEventListener("click", () => {
    addDialog.showModal();
});
removeButton.addEventListener("click", () => {
    removeDialog.showModal();
});
cancelButton.forEach(button => button.addEventListener("click", () => {
    addDialog.close();
    addDialog.querySelector("form").reset();
    removeDialog.close();
    removeDialog.querySelector("form").reset();
}));

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value);
    const status = document.querySelector("#status").value === "true";
    addBookToLibrary(title, author, pages, status);
    console.log(myLibrary);
    updateDisplay();
    addDialog.close();
    addForm.reset();
});

const removeDialog = document.getElementById("remove-dialog");
const removeForm = document.querySelector(".remove-form");

removeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#remove").value.trim();
    const index = myLibrary.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
    if (index === -1) {
        alert("No matched books");
        return;
    }
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    updateDisplay();
    removeDialog.close();
    removeForm.reset();
    return myLibrary;
});


/////////////  display/  creating book cards  ///////////////////

const books = document.querySelector(".books").querySelector(".card");
const read = document.querySelector(".read").querySelector(".card");
const unread = document.querySelector(".unread").querySelector(".card");

function createBookCard(book) {
        ////////////// image section /////////////
        const newBook = document.createElement("div");
        newBook.classList.add("new-book");
        const image = document.createElement("img");
        image.alt = book.title;
        // image.src = "img/book1.jpg";
        image.style.backgroundColor = "red";
        image.style.width = "100px";
        image.style.height = "100px";
        image.style.textAlign = "center";
        newBook.append(image);

        ///////// book button sections//////////////////
        const bookButton = document.createElement("div");
        bookButton.classList.add("book-action");

        
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.textContent = "-";
        removeButton.addEventListener("click", () => {
            const id = book.id;
            
            console.log(id);
            const index = myLibrary.findIndex(book => book.id === id);

            myLibrary.splice(index, 1);
            console.log(myLibrary);
            updateDisplay();
        });
        

        const readButton = document.createElement("button");
        readButton.classList.add("read");
        readButton.addEventListener("click", () => {
            book.read = !book.read;
            updateDisplay();
        });
        
        readButton.textContent = getStatusText(book);

        bookButton.append(removeButton);
        bookButton.append(readButton);
        newBook.append(bookButton);
        return newBook;

}

function getStatusText(book) {
    return book.read ? "Unread" : "Read";
}

function updateDisplay() {
   books.innerHTML = '';
   read.innerHTML = '';
   unread.innerHTML = '';

        myLibrary.forEach(book => {
            books.append(createBookCard(book));
            if (book.read === true) {
                read.append(createBookCard(book));
            }
            else {
                unread.append(createBookCard(book));
            }
        });

}
     
updateDisplay();
        


