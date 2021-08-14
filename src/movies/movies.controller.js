const service = require("./movies.service");

// check if the given movie id is correct
async function hasValidMovieId(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(Number(movieId));

  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found." });
}

// list all movies that are being shown using parameters
async function list(req, res) {
  if (req.query.is_showing) {
    res.json({ data: await service.list(Boolean(is_showing)) });
  }
}

// list a single movie
async function read(req, res) {
  res.json({ data: res.locals.movie });
}
 
// list all theaters showing a given movie
async function listTheatersForMovie(req, res) {
  res.json({
    data: await service.listTheatersForMovie(res.locals.movie.movie_id),
  });
}

// list reviews for a given movie
async function listMovieReviews(req, res) {
  res.json({
    data: await service.listMovieReviews(res.locals.movie.movie_id),
  });
}

module.exports = {
  list,
  read: [hasValidMovieId, read],
  listTheatersForMovie,
  listMovieReviews,
};
