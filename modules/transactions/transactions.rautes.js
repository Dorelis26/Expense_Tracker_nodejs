const express = require('express');

const auth = require('../../middleWare/auth');

const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addExpense');
const getTransactions = require('./controllers/getTransactions');
const deleteTransaction = require('./controllers/deleteTransaction');
const editTransaction = require('./controllers/editTransaction');

const transactionsRoutes = express.Router();

//middleware
transactionsRoutes.use(auth);

//protected routes
transactionsRoutes.post('/addIncome', addIncome);
transactionsRoutes.post('/addExpense', addExpense);
transactionsRoutes.get('/', getTransactions);
//delete transaction
transactionsRoutes.delete('/:transaction_id', deleteTransaction);
//edit transaction
transactionsRoutes.patch('/', editTransaction);

module.exports = transactionsRoutes;
