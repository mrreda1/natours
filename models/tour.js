const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A tour must have a name."],
			unique: true,
			trim: true,
			maxlength: [
				40,
				"A tour name must have less than or equal to 40 characters.",
			],
			minlength: [
				8,
				"A tour name must have more than or equal to 8 characters.",
			],
			// validate: [validator.isAlpha, "Tour name should be only characters."],
		},
		slug: String,
		duration: {
			type: Number,
			required: [true, "A tour must have a duration"],
		},
		ratingAverage: {
			type: Number,
			default: 4.5,
			required: [true, "A tour must have a rating."],
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, "A tour must have a price."],
		},
		priceDiscount: {
			type: Number,
			validate: {
				// Only new document.
				message: "Discount ({VALUE}) must be less than or equal to the price.",
				validator: function (val) {
					return val <= this.price;
				},
			},
		},
		maxGroupSize: {
			type: Number,
			required: [true, "A tour must have a group size."],
		},
		difficulty: {
			type: String,
			required: [true, "A tour must have a difficulty."],
			enum: {
				values: ["easy", "medium", "difficult"],
				message: "Difficulty is either: easy, medium, difficult.",
			},
		},
		description: {
			type: String,
			trim: true,
		},
		summary: {
			type: String,
			trim: true,
			required: [true, "A tour must have a summary."],
		},
		imageCover: {
			type: String,
			required: [true, "A tour must have a cover image."],
		},
		images: {
			type: [String],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
		startDates: {
			type: [Date],
		},
		secretTour: {
			type: Boolean,
			default: false,
		},
		startLocation: {
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		locations: [
			{
				type: {
					type: String,
					default: "Point",
					enum: ["Point"],
				},
				coordinates: [Number],
				address: String,
				description: String,
				day: Number,
			},
		],
		guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// tourSchema.pre("save", async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

tourSchema.virtual("durationWeeks").get(function () {
	return Number((this.duration / 7).toFixed(2));
});

tourSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "tour",
	localField: "_id",
});

// DOCUMENT MIDDLEWARE, runs before .save() and .create()
tourSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

tourSchema.pre("save", (next) => {
	console.log("Will save document...");
	next();
});

tourSchema.post("save", (doc, next) => {
	console.log(doc);
	next();
});

// tourSchema.pre("find", function (next) {
tourSchema.pre(/^find/, function (next) {
	this.find({ secretTour: { $ne: true } });
	this.start = Date.now();
	next();
});

tourSchema.post(/^find/, function (doc, next) {
	console.log(`Time taken is ${Date.now() - this.start} milliseconds!`);
	next();
});

tourSchema.pre(/^find/, function (next) {
	this.populate({
		path: "guides",
		select: "_id name email",
	});
	next();
});

tourSchema.pre("aggregate", function (next) {
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
