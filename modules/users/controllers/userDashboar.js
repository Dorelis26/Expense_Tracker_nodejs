const mongoose = require('mongoose');
const transactionsModel = require('../../../models/transactions');

const userDashboard = async (req, res) => {
	const usersModel = mongoose.model('users');

	const transactionModel = mongoose.model('transactions');

	console.log(req.user);

	const getUser = await usersModel
		.findOne({
			_id: req.user._id,
		})
		.select('-password');
	const transactions = await transactionsModel
		.find({
			user_id: req.user._id,
		})
		.sort('-createdAt')
		.limit(5);
	res.status(200).json({
		status: 'success',
		data: getUser,
		transactions: transactions,
	});
};

module.exports = userDashboard;
