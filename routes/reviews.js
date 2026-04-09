const reviewController = require('./../controllers/review');
const express = require('express');
const router = express.Router({ mergeParams: true });
const authController = require('./../controllers/auth');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview,
  )
  .update(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.updateReview,
  );

module.exports = router;
