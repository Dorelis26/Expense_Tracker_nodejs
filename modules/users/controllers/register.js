const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtMananger = require('../../../manangers/jwtMananger');
const emailMananger = require('../../../manangers/emailMananger');
const register = async (req, res) => {
	const usersModel = mongoose.model('users');

	const { email, password, confirm_password, name, balance } = req.body;

	//validations
	const getDuplicateEmail = await usersModel.findOne({
		email: email,
	});

	if (getDuplicateEmail) throw ' this Email already exist';
	if (!email) throw 'email must be provided';
	if (!name) throw ' name must be provided';
	if (!password) throw 'password must be provided';
	if (password.length < 5) throw ' password must be at least 5 characters long';
	if (password !== confirm_password)
		throw 'the confirme password does not match the password';

	//hash the password

	const hashPassword = await bcrypt.hash(password, 12);
	//save the data to the database
	const createdUser = await usersModel.create({
		name: name,
		email: email,
		password: hashPassword,
		balance: balance,
	});

	const accessToken = jwtMananger(createdUser);

	await emailMananger(
		createdUser.email,
		'Welcome to expense tracker. we hope you can manage your expensess easily from our platform',
		'<h1>Welcome to expense tracker.<h1> <br><br/> <p>we hope you can manage your expensess easily from our platform</p>',
		'Welcome to Expense tracker !'
	);
	res.status(201).json({
		status: 'User register successfully',
		accessToken: accessToken,
	});
};

module.exports = register;
