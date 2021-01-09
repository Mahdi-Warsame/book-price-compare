import { displayBooksForGoogle, displayBooksForITBooks } from './ui.js';
// Waxaan aplication soo akhrinayo buugaagta
// Ilaa saddax meel oo kala gedisan
// waxaan isticmaali doonaa APIs ka
// shirkaddaha Google books, iyo labo kale

// Interface
// ? http://api.bookmooch.com/api/asin?asins=0445408499+0425105679&o=json

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
    .then((data) => displayITBookInformation(data));
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
  // Google
  data.items.forEach((book) => {
    let title;

    console.log('From GOOGLE ' + book.volumeInfo.title);
    // To get the price we need to send another request to google
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=title:${book.volumeInfo.title}`
    )
      .then((response) => response.json())
      .then((data) => {
        const price = data.items[0].saleInfo.listPrice.amount / 7;
        displayBooksForGoogle(
          book.volumeInfo.imageLinks.thumbnail,
          book.volumeInfo.title,
          book.volumeInfo.authors[0],
          // book.saleInfo.listPrice.amount,
          `$${price}`,
          'Source: Google'
        );
      });
  });
};

const displayITBookInformation = (book) => {
  // IT Book Store
  if (book.title) {
    return displayBooksForITBooks(
      book.image,
      book.title,
      book.price,
      book.authors,
      'Source: IT Books'
    );
  }
  return displayBooksForITBooks(
    book.image,
    'Book Not found',
    'No price',
    'Source: IT Books'
  );

  // book.forEach((book) => {
  //   // image, title, author, price, source
  //   // displayBooksForITBooks(book.image, book.title, book.price, 'From IT Books');

  //   console.log('From IT Books ' + book.title);
  // });
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

function scrape(url) {
  fetch(proxyurl + url)
    .then((response) => response.text())
    .then((data) => domParser(data));
}

const domParser = async (data) => {
  const parser = new DOMParser();
  const parsedDocument = await parser.parseFromString(data, 'text/html');
  // const [
  //   title,
  //   isbn_13,
  //   isbn_10,
  //   authors,
  //   edition,
  //   binding,
  //   publisher,
  //   published,
  //   price,
  // ]
  // const result = parsedDocument.querySelector('.bookinfo');
  // title = a-size-base-plus a-color-base a-text-normal
  // author = a-row a-size-base a-color-secondary [0]
  // image = s-image
  // price = a-offscreen
  console.log(parsedDocument);
  const title = parsedDocument.querySelectorAll('.a-link-normal a-text-normal');
  if (!title) {
    return console.log('loading..');
  }
  return console.log(title);
};
// scrape('https://isbnsearch.org/isbn/9780134123486');
scrape('https://www.amazon.com/s?k=9781680501957');

// title = a-size-base-plus a-color-base a-text-normal
// author = a-row a-size-base a-color-secondary [0]
// image = s-image
// price = a-offscreen
