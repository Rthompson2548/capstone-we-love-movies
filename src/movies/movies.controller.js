const service = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res, next) {
    const isShowing = req.query.is_showing
    if (isShowing) {
        res.json({ data: await service.listShowing() })
    } else {
        res.json({ data: await service.list() })
    }
}

async function listTheaters(req, res, next) {
    const movieId = req.params.movieId
    res.json({ data: await service.listTheaters(movieId)})
}

async function listReviews(req, res, next) {
    const movieId = req.params.movieId
    const result = await service.listReviews(movieId)
    res.json({ data: result })
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        console.log(movie) 
        return next()
    }
    next({ status: 404, message: 'Movie cannot be found' })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)]
}
