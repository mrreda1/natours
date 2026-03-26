const User = require("./../models/user");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apifeatures");
const AppError = require("./../utils/appError");
const filterObj = require("./../utils/filterObj");

exports.getAllUsers = catchAsync(async (req, res) => {
	const features = new APIFeatures(User.find(), req.query)
		.sort()
		.limit()
		.filter()
		.paginate();

	const users = await features.query;

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const user = await User.findById(id);

	if (!user) {
		return next(new AppError("User not found!", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const user = await User.findByIdAndDelete(id);

  console.log(id, user);

	if (!user) {
		return next(new AppError("User not found!", 404));
	}

	res.status(204).json({
		status: "success",
		data: null,
	});
});

exports.createUser = (req, res) => {
	res.status(500).json({
		status: "fail",
		message: "This route is under construction",
	});
};

exports.updateUser = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError("This route is not for user password updates.", 400),
		);
	}

	const filteredBody = filterObj(req.body, "name", "email");
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		runValidators: true,
		new: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			user: updatedUser,
		},
	});
});

exports.updateMyInfo = (req, res, next) => {
	const user = req.user;

	if (req.body.password || req.body.passwordConfirm) {
		return next(new AppError("You cannot update password!", 400));
	}

	res.status(200).json({
		status: "success",
	});
};

exports.deleteMyAccount = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "success",
		data: null,
	});
});
