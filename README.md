# We Love Movies 
### Built using Express, PostSQL, and Knex

## To Run Server
#### 1. Fork / clone this repo
#### 2. cd into project folder
#### 3. Run npm install to install project dependencies.
#### 4. Run npm run start:dev to start your server in development mode.
#### 5. Or, run npm start.

## Endpoints to Test
* GET /movies/?is_showing=true for movies currently in theaters.
* GET /movies/21 for details on "Spider-Man: Into the Spider-Verse"
* GET /movies/210 for an error response for a movie id that does not exist
* GET /movies/21/reviews for reviews of a movie
* delete a review by using it's review_id which you can find an example of in the response from the previous request. DELETE /reviews/141, for example.
* GET /theaters for list of all theaters

## Prompt
#### You've been hired on as a back end developer for a new startup called WeLoveMovies! As another developer works on the design and front end experience, you have been tasked with setting up a database and building out specific routes so that users can gain access to data about movies, theaters, and reviews.

## Skills Used
* Ability to both build complex servers and access data through a database.
* Install and use common middleware packages.
* Receive requests through routes.
* Running tests from the command line.
* Access relevant information through route and query parameters.
* Create an error handler for the case where a route does not exist.
* Build an API following RESTful design principles.
* Create and customize a knexfile.js file.
* Create a connection to your database with knex.
* Write database queries to complete CRUD routes in an Express server.
* Return joined and nested data with Knex.
* Write database migrations using Knex's migration tools.

