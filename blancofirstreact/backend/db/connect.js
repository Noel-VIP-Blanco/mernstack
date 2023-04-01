require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
	console.log("Connected to Database");

	return mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser : true,
		useUnifiedTopology : true,
	});
};

module.exports = connectDB;