const service = require("./reviews/service");

async function reviewHasValidId(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.reviewHasValidId(Number(reviewId));

  if (review) {
    res.locals.review = review;
    return next();
  }

  next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
  await service.delete(Number(res.locals.review.review_id));
  // send 204 no content message once review is deleted
  res.sendStatus(204);
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  const review = await service.read(res.locals.review.review_id);
  const reviewToSend = {
    ...review,
    critic: await service.readCritic(res.locals.review.critic_id),
  };
  res.json({ data: reviewToSend });
}

// async function readReviews(req, res) {
//   const reviews = await service.readReviews(res.locals.movie.movie_id);

//   for (let review of reviews) {
//     const critic = await service.readCritic(review.critic_id);

//     review["critic"] = critic;
//   }

//   res.json({ data: reviews });
// }

module.exports = {
  delete: [reviewHasValidId, destroy],
  update: [reviewHasValidId, update],
  // readReviews
};
