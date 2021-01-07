import { displayBooksForGoogle, displayBooksForITBooks } from './ui.js';
// Waxaan aplication soo akhrinayo buugaagta
// Ilaa saddax meel oo kala gedisan
// waxaan isticmaali doonaa APIs ka
// shirkaddaha Google books, iyo labo kale

// Interface

//! https://api.itbook.store/1.0/books/9781680501957
// ! https://www.googleapis.com/books/v1/volumes?q=isbn:<your_isbn_here>
// Link should look like this
// !Search book by volume / Author
// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBq7BLYWiU0zCAXkFifBTm0BieiYL4jEAA

// ! Search book by title
//? 1-  https://www.googleapis.com/books/v1/volumes?q=sql

// Another Books API
//? 2-  https://api.itbook.store/1.0/search/python

//undefined
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', (e) => {
  const searchInput = document.querySelector('#search').value;
  e.preventDefault();
  // const googleURL = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
  const googleURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchInput}`;
  // const itBookUrl = `https://api.itbook.store/1.0/search/${searchInput}`;
  const itBookUrl = `https://api.itbook.store/1.0/books/${searchInput}`;
  fetchBooksGoogle(googleURL);
  fetchBooksITBooks(itBookUrl);
});
const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const fetchBooksITBooks = (url) => {
  // will call Fetch API to request books from the google api
  fetch(proxyurl + url)
    .then((response) => response.json())
    .then((data) => displayITBookInformation(data.books));
};
const fetchBooksGoogle = (url) => {
  // will call Fetch API to request books from the google api
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayGoogleBookInformation(data));
};

// const searchBooksFromItBookStore = (url) => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => bookInformation(data));
// };

// Books information
const displayGoogleBookInformation = (data) => {
  // displayBooks();
  // Google
  data.items.forEach((book) => {
    // image, title, author, price, source
    // haddii query aan soo galinayo laga dhax helo title
    displayBooksForGoogle(
      book.volumeInfo.imageLinks.thumbnail,
      book.volumeInfo.title,
      book.volumeInfo.authors[0],
      // book.saleInfo.listPrice.amount,
      'Not for sale',
      'From Google'
    );
    console.log('From GOOGLE ' + book.volumeInfo.title);
  });
};

const displayITBookInformation = (books) => {
  // IT Book Store
  books.forEach((book) => {
    // image, title, author, price, source
    displayBooksForITBooks(book.image, book.title, book.price, 'From IT Books');

    console.log('From IT Books ' + book.title);
  });
};

// This could be third option
// https://isbndb.com/apidocs/v2

// !Read more https://developers.google.com/books/docs/v1/using

/***
 * TODO 
1) Search by isbn from google books and get price
2) display more appropiately in the frontend side
3) add one more API to get book from somwhere else
**/
