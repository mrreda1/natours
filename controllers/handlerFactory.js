const catchAsync = require("./../utils/catchAsync.js");
const AppError = require("./../utils/appError.js");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      const err = new AppError(`Document with ID '${id}' not found.`, 404);
      return next(err);
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
