const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require(`${__dirname}/app`);

process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED EXCEPTION!!");
	console.log("Shutting down...");
	// server.close(() => {
	process.exit(1);
	// });
});

// console.log(process.env);
dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {}).then(() => {
	console.log("connected to database...");
});
// .catch((err) => console.log("Error connecting to database..."));

const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED REJECTION!!");
	console.log("Shutting down...");
	server.close(() => {
		process.exit(1);
	});
});

// console.log(x);
