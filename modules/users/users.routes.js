const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/users.login');
const userDashboard = require('./controllers/userDashboar');
const auth = require('../../middleWare/auth');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword = require('./controllers/restetPassword');

const usersRoutes = express.Router();

usersRoutes.post('/register', register);
usersRoutes.post('/login', login);
usersRoutes.post('/forgotPassword', forgotPassword);
usersRoutes.post('/resetPassword', resetPassword);
//middleware
usersRoutes.use(auth);

//protected routes
usersRoutes.get('/dashboard', userDashboard);

module.exports = usersRoutes;
