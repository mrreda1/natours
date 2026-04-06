const express = require("express");

const router = express.Router();
const controller = require(`${__dirname}/../controllers/tours`);
const authController = require("./../controllers/auth");
const reviewController = require("./../controllers/review");

router
  .route("/top-5-cheap")
  .get(
    authController.protect,
    controller.aliasTopTours,
    controller.getAllTours,
  );

router
  .route("/")
  .get(authController.protect, controller.getAllTours)
  .post(authController.protect, controller.createTour);

router.route("/stats").get(authController.protect, controller.getTourStats);

router
  .route("/monthly-plan/:year")
  .get(authController.protect, controller.getMonthlyPlan);

router
  .route("/:id")
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    controller.deleteTour,
  );

router
  .route("/:tourID/reviews")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview,
  );

module.exports = router;
