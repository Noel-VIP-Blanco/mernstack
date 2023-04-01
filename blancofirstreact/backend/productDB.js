require("dotenv").config();
//connect to database
const connectDB = require("./db/connect");
//get the model
const ProductModel = require("./models/products.models");

const ProductJson = require("./products.json");

const start = async() => {
	try{
		//node productDB.js
		//it will upload the json file to the database
		await connectDB(process.env.MONGODB_URL);
		await ProductModel.create(ProductJson);
		console.log("Success");
	}
	catch(er){
		console.log(er);
	}
};

start();
