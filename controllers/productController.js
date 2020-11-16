const Product = require("../models/productModel");
const factory = require("./handlerfactory");

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.UpdateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
