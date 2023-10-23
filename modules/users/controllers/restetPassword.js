const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailMananger = require('../../../manangers/emailMananger');
const resetPassword = async (req, res) => {
	const userModel = mongoose.model('users');

	const { email, new_password, reset_code } = req.body;

	if (!email) throw 'email is required';
	if (!new_password) throw 'please provide new password';
	if (!reset_code) throw 'please provide reset code';
	if (new_password.length < 5)
		throw 'new password must be at least 5 characters long';
	const getUserWithResetCode = await userModel.findOne({
		email: email,
		reset_code: reset_code,
	});

	if (!getUserWithResetCode) throw 'Reset code does not match';

	const hashPassword = await bcrypt.hash(new_password, 12);

	await userModel.updateOne(
		{
			email: email,
			password: hashPassword,
			reset_code: '',
		},
		{
			runValidators: true,
		}
	);

	await emailMananger(
		email,
		'your password has been reseted successfully, if it wans not you who reset the password please contact us.',
		'your password has been reseted successfully, if it wans not you who reset the password please contact us.',
		'Password reset Succssfully!'
	);

	res.status(200).json({
		status: 'success',
		message: ' Password has been reseted succesfully',
	});
};
module.exports = resetPassword;
