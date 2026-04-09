const Tour = require('./../models/tour');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');

exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
exports.getAllTours = factory.getMany(Tour);
exports.getTour = factory.getOne(Tour);

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: `$${req.query.id}`,
        // _id: { $toUpper: `$${req.query.id}` },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        numRatings: { $sum: '$ratingsQuantity' },
      },
    },
    {
      $sort: { avgPrice: +1 },
    },
    {
      $match: {
        _id: { $ne: 'easy' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-1-1`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: {
          $push: {
            _id: '$_id',
            name: '$name',
            price: '$price',
            duration: '$duration',
            difficulty: '$difficulty',
            summary: '$summary',
          },
        },
      },
    },
    {
      $sort: { numTours: -1 },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        numTours: '$numTours',
        tours: '$tours',
      },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
