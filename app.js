const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/errorHandler');
require('express-async-errors');
const app = express();
app.use(cors());
const port = 8000;

//import dotenv
require('dotenv').config();
//import mongoose
const mongoose = require('mongoose');
const usersRoutes = require('./modules/users/users.routes');
const transactionsRoutes = require('./modules/transactions/transactions.rautes');
//connect to the database
mongoose
	.connect(process.env.mongo_connection, {})
	.then(() => {
		console.log('Connection to mongoDB sucsessful!');
	})
	.catch(() => {
		console.log('Conection to mongoDB Failed!');
	});
//Models initialization
require('./models/users');
require('./models/transactions');
app.use(express.json());

//routes
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

//error handler (imported)
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'Failed',
		message: ' Not found',
	});
});
app.use(errorHandler);
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
