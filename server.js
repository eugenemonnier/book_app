/* eslint-disable no-unused-expressions */
'use strict';

// dependencies
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
require('ejs');
const pg = require('pg');

// Database setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', error => console.errorHandler(error));

// global variables
const app = express();
const PORT = process.env.PORT || 3001;


// server static files from public
app.use(express.static('./public'));

// setup view engine
app.set('view engine', 'ejs');

// body paraser
app.use(express.urlencoded({extended:true}));

// routes
app.get('/', getHomePage);
app.get('/searches/new', displaySearch);
app.post('/searches/new', bookData);
app.get('/books/:book_id', getBook);

function displaySearch(request,response) {
  // display search page
  response.status(200).render('./pages/searches/new');
}

function getHomePage(request, response) {
  // get home page
  let sql = 'SELECT * FROM books;';
  return client.query(sql)
    .then(results => {
      response.render('index', {results: results.rows});
    })
    .catch(errorHandler);
}

function bookData(request, response) {
  try {
    let searchWord = request.body.search[0];
    let searchType = request.body.search[1];
    let addOnURL;
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;
    searchType === 'title' ? addOnURL = `+intitle:${searchWord}` : addOnURL `+inauthor:${searchWord}`;
    url += addOnURL;
    return superagent.get(url)
      .then (agentResults => {
        let bookArray = agentResults.body.items;
        // console.log(agentResults.request.url);
        bookArray.map(book => {
          let newBook = new Book(book.volumeInfo);
          // let searchString = agentResults.request.url.substring(46);
          // let seaStr = searchString.subString(45);
          newBook['searchUrl'] = addOnURL;
          console.log(newBook);
          storeBooks(newBook);
          return newBook;
        });
        getBooks(addOnURL,response);
      });

        // betterBookArray.forEach((book, index) => {
      //       .then(results => {betterBookArray[index]['id'] = results;
      //       resolve(betterBookArray[index]['id']);
      //     });
      //     console.log(betterBookArray[index]['id']);
      //   });
      //   response.status(200).render('./pages/searches/show.ejs', {books: betterBookArray,});
      // });
    // .catch((error) => errorHandler(error));
    // response.status(200).render('./pages/searches/show.ejs', {books: currentBook,});

    // return currentBook.id;
    // });

    // .catch((error) => errorHandler(error));
  }
  catch(error) {
    errorHandler(error, request, response);
  }
}

const getBooks = ((addOnURL, response) => {
  let sql = 'SELECT * FROM books WHERE search =$1;';
  let safe = [addOnURL];
  client.query(sql,safe)
    .then (results => {
      response.status(200).render('./pages/searches/show.ejs', {books: results,});
    });
});

const storeBooks = (currentBook => {
  let safeValues = [currentBook.title, currentBook.authors, currentBook.description, currentBook.bookImage, currentBook.searchUrl];
  let sql = 'INSERT INTO books (title, authors, book_description, img_url, search) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
  return client.query(sql, safeValues)
    .then(result => {
      currentBook['id'] = result.rows[0].id;
      return currentBook.id;
    })
    .catch((error) => errorHandler(error));
});

function Book(info) {
  info.imageLinks !== undefined ? this.bookImage = info.imageLinks.thumbnail.replace('http:', 'https:') : this.bookImage = 'https://cdn3-www.comingsoon.net/assets/uploads/2018/08/conair.jpg';
  info.title !== undefined ? this.title = info.title : this.title = 'no title available';
  info.authors !== undefined ? this.authors = info.authors.toString(', ') : this.authors = 'no author available';
  info.description !== undefined ? this.description = info.description : this.description = 'no description available';
}

function getBook(request, response) {
  let sql = 'SELECT * FROM books WHERE id=$1;';
  let values = [request.params.book_id];
  console.log(values);
  return client.query(sql, values)
    .then(results => {
      return response.render('pages/books/details', {selectedBook: results.rows[0]});
    })
    .catch(error => errorHandler(error, request, response));
}
// error handler
function errorHandler(error, request, response) {
  const errorObject = {
    errorMsg: 'robert messed up again!',
    error: error,
    request: request,
    response: response
  };
  response.status(500).render('./pages/error.ejs', {errors: errorObject});
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
