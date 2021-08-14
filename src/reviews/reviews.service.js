const { first } = require("../db/connection");
const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}

function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
    }

function update(review) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(review);
}

function readReviewCritic(criticId) {
  return knex("critics")
    .select("*")
    .where({ critic_id: criticId })
    .first();
}

function readAllReviews(movieId) {
  return knex("reviews")
    .select("*")
    .where({ movie_id: movieId });
}

module.exports = {
  delete: destroy,
  read,
  update,
  readReviewCritic,
  readAllReviews,
};
