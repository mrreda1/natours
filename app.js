const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error");

const tourRouter = require(`${__dirname}/routes/tours`);
const userRouter = require(`${__dirname}/routes/users`);
const reviewRouter = require(`${__dirname}/routes/reviews`);

const setupMiddlewares = require(`${__dirname}/utils/middlewares`);

const express = require("express");

const APIVersion = "1";
const app = express();

// MIDDLEWARE
setupMiddlewares(app);

// ROUTES
app.use(`/api/v${APIVersion}/tours`, tourRouter);
app.use(`/api/v${APIVersion}/users`, userRouter);
app.use(`/api/v${APIVersion}/reviews`, reviewRouter);

// Error handler for invalid routes
app.all("*", (req, res, next) => {
	const err = new AppError(
		`can't find ${req.originalUrl} on this server!`,
		404,
	);

	next(err);
});

app.use(globalErrorHandler);

module.exports = app;
