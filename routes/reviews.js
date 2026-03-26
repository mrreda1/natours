const reviewController = require("./../controllers/review");
const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth");

router.route("/:id").get(reviewController.getReview);
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview,
  );

module.exports = router;
