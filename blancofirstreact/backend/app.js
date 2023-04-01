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
