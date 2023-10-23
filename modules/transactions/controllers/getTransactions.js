const mongoose = require('mongoose');

const getTransactions = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');
	console.log(req.query);

	const transactions = await transactionsModel.find({
		user_id: req.user._id,
		...req.query, //api/transactions?transactions_type=income //
	});
	res.status(200).json({
		status: 'success',
		data: transactions,
	});
};

module.exports = getTransactions;
