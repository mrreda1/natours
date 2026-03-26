const Review = require("./../models/review");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apifeatures");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const review = await Review.findById(id);
  if (!review) {
    return next(AppError("Review not found!", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
