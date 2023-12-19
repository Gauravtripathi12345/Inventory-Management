// const express = require('express');
import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';

const server = express();

server.use(express.static('public'));
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookies: { secure: false }
}));
// parse form data
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
server.use(express.json());
// create an instance of ProductController
const productController = new ProductController();
const usersController = new UserController();

server.get('/register', usersController.getResgister);
server.get('/login', usersController.getLogin);
server.post('/login', usersController.postLogin);
server.post('/register', usersController.postRegister);

server.get('/', auth, productController.getProducts);
server.get('/new', auth, productController.getAddForm);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.post('/delete-product/:id', auth, productController.deleteProduct);

server.post('/', auth, uploadFile.single('imageUrl'), validationMiddleware, productController.addNewProduct)
server.post('/update-product', auth, productController.postUpdateProduct)

server.use(express.static('src/views'));

server.listen(3400, () => {
    console.log("Server is running at 3400");
});
