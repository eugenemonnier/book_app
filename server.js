'use strict';

// dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
require('ejs');
const app = express();

const PORT = process.env.PORT || 3001;

// server static files from public
app.use(express.static('./public'));

// setup view engine
app.set('view engine', 'ejs');

// routes
app.get('/hello', getHomePage);

function getHomePage(request, response) {
  // get home page
  response.status(200).render('index');
}



app.listen(PORT, () => console.log(`Listening on ${PORT}`));
