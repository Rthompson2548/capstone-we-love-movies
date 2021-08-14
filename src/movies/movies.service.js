const knex = require("../db/connection");

function list(isShowing) {
  if (isShowing) {
    // m.movie_id is same as mt.movie_id
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id")
      .select("m.*")
      .where({ is_showing: true });
  } 
  return knex("movies")
    .select("*");
}


function read(movieId) {
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    // use .first() to only retrieve & resolve with 
    // the first record from query
    .first();
}

module.exports = {
    list,
    read
};
