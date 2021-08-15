const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

function addCritic(movies) {
    return movies.map((movie) => {
        return {
            'review_id': movie.review_id,
            'content': movie.content,
            'score': movie.score,
            'created_at': movie.created_at,
            'updated_at': movie.updated_at,
            'critic_id': movie.critic_id,
            'movie_id': movie.movie_id,
            'critic': {
                'critic_id': movie.c_critic_id,
                'preferred_name': movie.preferred_name,
                'surname': movie.surname,
                'organization_name': movie.organization_name,
                'created_at': movie.c_created_at,
                'updated_at': movie.c_updated_at
            }
        }
    })
}


function list() {
    return knex('movies')
        .select('*')
        .groupBy('movies.movie_id')
}

function listMovie() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies.*')
        .where({ 'movies_theaters.is_showing': true })
        .groupBy('movies.movie_id')
}

function listMovieTheaters() {
    return knex('movies_theaters')
        .join('movies', 'movies.movie_id', 'movies_theaters.movie_id')
        .join('theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
        .select('theaters.*')
        .groupBy('theaters.theater_id')
}

function listMovieReviews(movieId) {
    console.log(movieId)
    return knex('movies')
        .join('reviews', 'movies.movie_id', 'reviews.movie_id')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select(
            'movies.*',
            'reviews.*',
            'critics.created_at as c_created_at',
            'critics.updated_at as c_updated_at',
            'critics.critic_id as c_critic_id',
            'critics.preferred_name',
            'critics.surname',
            'critics.organization_name',
        )
        .where({'reviews.movie_id': movieId})
        .then(addCritic)
}

function read(movie_id) {
    return knex('movies')
        .select('*')
        .where({ movie_id })
        .first()
}

module.exports = {
    list,
    listMovie,
    read,
    listMovieTheaters,
    listMovieReviews
}
