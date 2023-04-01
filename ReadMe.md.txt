M E R N Stack
>>>INSTALL 
install i express
install i -g nodemon
install i mongoose
install i dotenv    ======== make sure to install inside the root folder or the express application

>>>COMMANDS TO REMEMBER
npm start ===== start react
npm init -y ===== initialize express in folder to create package.js


>>>>>>CHANGES TO FILES
****package.js  from where you "npm init -y" location
"scripts": [
	"start": "node app.js",
	"dev": "nodemon app.js"
]
****END OF PACKAGE.JS


CREATE FOLDER AND FILE
------ROUTES------
*****products.routes.js*****
const express = require("express");
const router = express.Router();


const {getAllProducts, getAllProductsTesting} = require("../controllers/products.controllers");

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);

module.exports = router;
*****END OF PRODUCT.ROUTES.JS

-------------------------- END OF ROUTES FOLDER

------CONTROLLERS----
*****products.controllers.js*****
const ProductModel = require("../models/products.models");
const getAllProducts = async (req, res)=> {
	const productData = await ProductModel.find({});
	res.status(200).json({productData});
};

const getAllProductsTesting = async (req, res)=> {
	res.status(200).json({msg:"I am getAllProductsTesting"});
};

module.exports = {getAllProducts, getAllProductsTesting};
*****END OF PRODUCT.CONTROLLERS.JS


------------------------------- END OF CONTROLLER FOLDER

*****/backend/app.js
const express = require("express");
const app = express();
const connectDB = require("./db/connect");


//import routes
const products_routes = require("./routes/products.routes");

const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
	res.send("Hi, I am live");
});

//Get all the routers
app.use("/products", products_routes);

const start = async () => {
	try{
		await connectDB();
		app.listen(PORT, () => {
			console.log(`${PORT} Yes I am conncted`);
		});
	} 
	catch (error){
		console.log(error);
	}
}

start();



*****/backend/app.js ----- end of app.js

------------END OF CONTROLLER FOLDER

------------START OF MODELS FOLDER
**********products.models.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name:{
		type: String,
		required : true,	
	},
	price:{
		type: Number,
		required: [true, "Price must be provided"],
	},
	featured:{
		type: Boolean,
		default: false,
	},
	rating:{
		type: Number,
		default: 4.9,
	},
	createdAt:{
		type: Date,
		default: Date.now(),
	},
	company:{
		type: String,
		enum: {
			values:["apple", "samsung", "dell", "mi"],
			message:`{values} is not supported`,
		},
	},
});

module.exports = mongoose.model("Product", productSchema);
*********END OF PRODUCT.MODELS.JS
------------------------END OF MODELS FOLDER



------------DB FOLDER
********connect.js
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
*********END OF CONNECT.js


******* .env    file
MONGODB_URL = mongodb+srv://noelvipblanco:Qwerty12345@noelvipblanco.jnkvnhf.mongodb.net/NoelVIPBlanco?retryWrites=true&w=majority
*******END OF  .env    file

-------------END OF DB FOLDER


*******productDB.js   -------- BACKEND FOLDER CREATE IT 
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

*******END OF PRODUCTDB.JS

*******products.json ========== CREATE AT BACKEND
[
	{
		"name": "iphone",
		"price": 154,
		"feature": true,
		"company": "apple"
	},

	{
		"name": "iphone",
		"price": 154,
		"feature": true,
		"company": "apple"
	},

	{
		"name": "iphone",
		"price": 154,
		"feature": true,
		"company": "apple"
	},

	{
		"name": "iphone2",
		"price": 200,
		"company": "apple"
	},

	{
		"name": "iphone3",
		"price": 130,
		"feature": true,
		"company": "apple"
	},

	{
		"name": "iphone21",
		"price": 154,
		"company": "apple"
	}
]

********END OF PRODUCTS.JS