const ProductModel = require("../models/products.models");
const getAllProducts = async (req, res)=> {
	const productData = await ProductModel.find({});
	res.status(200).json({productData});
};

const getAllProductsTesting = async (req, res)=> {
	res.status(200).json({msg:"I am getAllProductsTesting"});
};

module.exports = {getAllProducts, getAllProductsTesting};