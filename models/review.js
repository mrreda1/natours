const mongoose = require("mongoose");
const AppError = require("./../utils/appError");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      min: [1, "rating should be 1 or more."],
      max: [5, "rating should be 5 or less."],
      required: [true, "Review should has a rating"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, (next) => {
  // this.populate({
  //   path: "tour",
  //   select: "_id name summary guides locations duration",
  // });
  // this.populate({
  //   path: "user",
  //   select: "_id name email",
  // });
  next();
});

reviewSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new AppError("You already added a review for this tour.", 409));
  } else {
    next(error);
  }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
