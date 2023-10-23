const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwtMananger = require('../../../manangers/jwtMananger');
const login = async (req, res) => {
	const usersModel = mongoose.model('users');

	const { email, password } = req.body;
	//verify if email exist or not
	const getUser = await usersModel.findOne({
		email: email,
	});
	if (!getUser) throw 'this email does not exist';
	console.log(getUser);
	//validate password:
	const comparePassword = await bcrypt.compare(password, getUser.password); //compare the string against the hash code
	if (!comparePassword) throw 'Email and password do not match';

	const accessToken = jwtMananger(getUser);

	res.status(200).json({
		status: 'success',
		message: 'user logged in succsessfully',
		accessToken: accessToken,
	});
};

module.exports = login;
