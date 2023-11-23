// const express = require('express');
import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js';
const server = express();

// parse form data
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
// create an instance of ProductController
const productController = new ProductController();

server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.post('/',validationMiddleware, productController.addNewProduct)

server.use(express.static('src/views'));


server.listen(3400, () => {
    console.log("Server is running at 3400");
});