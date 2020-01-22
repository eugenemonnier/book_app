'use strict';

// dependencies
const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
require('ejs');

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

function displaySearch(request,response) {
  // display search page
  response.status(200).render('./pages/searches/new');
}

function getHomePage(request, response) {
  // get home page
  response.status(200).render('index');
}

function bookData(request, response) {
  try {
    let searchWord = request.body.search[0];
    let searchType = request.body.search[1];
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;
    searchType === 'title' ? url += `+intitle:${searchWord}` : url += `+inauthor:${searchWord}`;
    superagent.get(url)
      .then (agentResults => {
        let bookArray = agentResults.body.items;
        const betterBookArray = bookArray.map(book => new Book(book.volumeInfo));
        response.status(200).render('./pages/searches/show.ejs', {books: betterBookArray});
      });
  }
  catch(error) {
    errorHandler(error, request, response);
  }
}

function Book(info) {
  info.imageLinks !== undefined ? this.bookImage = info.imageLinks.thumbnail.replace('http:', 'https:') : this.bookImage = 'https://cdn3-www.comingsoon.net/assets/uploads/2018/08/conair.jpg';
  info.title !== undefined ? this.title = info.title : this.title = 'no title available';
  info.authors !== undefined ? this.authors = info.authors.toString(', ') : this.authors = 'no author available';
  info.description !== undefined ? this.description = info.description : this.description = 'no description available';
}

// error handler
function errorHandler(error, request, response) {
  const errorObject = {
    errorMsg: 'robert messed up again!',
    error: error,
    request: request,
    response: response
  }
  response.status(500).render('./pages/error.ejs', {errors: errorObject});
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
