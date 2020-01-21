
  

# Book List
  

**Author**: Andrew Kyllo & Eugene Monnier

**Version**: 0.03.01

  

## Overview

A basic full stack application for a book list which will include the ability to search the Google Books API, add books to a database, and then render those books from a PostgreSQL database.

  

## Getting Started

### Documentation

[Express JS Docs](http://expressjs.com/en/4x/api.html)

[Dotenv Docs](https://www.npmjs.com/package/dotenv)

[Superagent Docs](https://ejs.co/)

[EJS Docs](https://visionmedia.github.io/superagent/)


## Architecture

<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
This website uses the following languages:
 - HTML/CSS
 - JavaScript
This website utilizes the following packages:
 - Express
 - Dotenv
 - Superagent
 - EJS

## Change Log

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:-->

 - 01-21-2020 09:45 - Initial setup of file structure.
 - 01-21-2020 10:50 - Feature 1 complete: Initial server setup
 - 01-21-2020 11:15 - Feature 2 complete: Add search function
 - 01-21-2020 13:15 - Feature 3 complete: Render search results

## Credits and Collaborations

<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Andrew Kyllo: [GitHub](https://github.com/kyllo34)
Eugene Monnier: [GitHub](https://github.com/eugenemonnier)
  

## Feature Request 1: *Initial Setup*
As a user, I want my application to load quickly so that I have an enjoyable experience.

### Description
**Given** that a user opens the application in the browser
**When** the user navigates to the home page
**Then** the index should load without a flash of unstyled content (FOUC)

### Feature Tasks

- [ ] Create a basic server.js file. Make sure your server is listening for connections on a PORT. Remember to set the view engine and serve your static CSS files.

- [ ] Install any necessary NPM packages and ensure that they are documented as dependencies in your package.json.

- [ ] For server-side rendering, EJS looks for a folder called views. Create a views folder, with a pages subfolder. Within this subfolder, create a file called index.ejs. Note: with server-side rendering, index.ejs is analogous to the typical index.html file that you are used to, but will also allow EJS syntax for templating.

- [ ] Create a basic HTML scaffold in your index.ejs file which contains several elements that you can view in the browser, such as a heading element that says "Hello World". Also create a basic CSS file with several rules, such as an obvious background color. These will serve as our "proof of life" that the files are connected as expected, both locally and when deployed.

- [ ] For testing purposes, include a temporary route such as app.get('/hello') and render your index.ejs file. Turn on your server and validate that the HTML elements and basic CSS styles are being rendered as expected. This route will be useful in the future if you ever need to test your application without relying on data from a database.

- [ ] Make a PR to master and confirm functionality on your deployed site.

### Time Estimate
```
Estimate of time needed to complete: 1 hour

Start time: 10:05

Finish time: 10:50

Actual time needed to complete: 45 minutes
```

## Feature 2: *Search*
As a user, I want to search the Google Books API so that I can view the results of my search.

### Description
**Given** that the user enters a seach query
**When** the user submits the search form
**Then** the search query should be included in a request to the Google Books API

### Feature Tasks
- [ ] In your index.ejs file, create a search field. Add the ability for a user to indicate if they are searching by title or author, as demonstrated in class.

- [ ] This form should be displayed to the user on page load, so your corresponding endpoint should be /, the home route.

- [ ] Make a PR to master and confirm functionality on your deployed site.

### Time Estimate
```
Estimate of time needed to complete: 30 mins

Start time: 11:00

Finish time: 11:15

Actual time needed to complete: 15 mins
```

## Feature 3: *Browse Results*
As a user, I want to be able to browse the search results.

### Description
**Given** that the user enters a seach query
**When** the user submits the search form
**Then** the first ten books should be displayed to the user

### Feature Tasks
- [ ] Create a Book constructor function to model your data, based on the properties needed to build out the wireframes. The properties should utilize ternary operators or short circuit evaluation to include default values, in case the API does not return results for a given property.

- [ ] Prevent mixed content warnings. Resource URLs returned by the API that are unsecure should be converted to use a secure protocol when the data is processed in the Book constructor.

- [ ] Install and require the superagent package from NPM; validate that it's listed as a dependency in your package.json.

- [ ] Add a route handler for a POST request to /searches. This route's callback will use Superagent to proxy a request to the Google Books API and return a list of ten books that match the search query.

- [ ] Map over the array of results, creating a new Book instance from each result object.

- [ ] Render the newly constructed array of objects in a new view, such as searches/show. Ensure each book is displayed with all the properties included in the wireframe.

- [ ] Make a PR to master and confirm functionality on your deployed site.

### Time Estimate
```
Estimate of time needed to complete: 1 hour

Start time: 12:00

Finish time: 13:15

Actual time needed to complete: 1 hour 15 minutes
```