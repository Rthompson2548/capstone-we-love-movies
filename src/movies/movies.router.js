const router = require("express").Router();
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.use(path, controller, router)
router.use("/:movieId/theaters", controller.hasValidMovieId, theatersRouter);

router.use("/:movieId/reviews", controller.hasValidMovieId, reviewsRouter);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;
