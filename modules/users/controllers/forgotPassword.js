const mongoose = require('mongoose');
const emailMananger = require('../../../manangers/emailMananger');

const forgotPassword = async (req, res) => {
	const usersModel = mongoose.model('users');

	const { email } = req.body;
	if (!email) throw 'email is required';
	const getUser = await usersModel.findOne({
		email: email,
	});
	if (!getUser) throw 'email has not been created';

	const resetCode = Math.floor(10000 + Math.random() * 90000);
	await usersModel.updateOne(
		{
			email: email,
		},
		{ reset_code: resetCode },
		{ runValidators: true }
	);

	await emailMananger(
		email,
		'Your password reset code is ' + resetCode,
		'Your password reset code is ' + resetCode,
		'Password reset - Expense tisacker'
	);

	res.status(200).json({
		status: ' Reset code sent to email successfully',
	});
};
module.exports = forgotPassword;
