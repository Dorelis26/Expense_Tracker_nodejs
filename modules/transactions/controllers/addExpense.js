const mongoose = require('mongoose');
const validator = require('validator');

const addExpense = async (req, res) => {
	const usersModel = mongoose.model('users');
	const transactionsModel = mongoose.model('transactions');

	const { amount, remarks } = req.body;
	if (!amount) throw 'ammount is required';
	if (!remarks) throw 'tremarks is required';

	if (remarks.length < 5) throw 'remarks must be at least 5 characters long';

	if (!validator.isNumeric(amount.toString()))
		throw 'Amount must be a valid number';
	if (amount < 0) throw 'Amount must be a positive number';

	await transactionsModel.create({
		user_id: req.user._id,
		amount: amount,
		remarks: remarks,
		transaction_type: 'expense',
	});

	await usersModel.updateOne(
		{
			_id: req.user._id,
		},
		{
			//$inc stands for increment, so we are increasing the balance by the amount.
			$inc: {
				balance: amount * -1,
			},
		},
		{
			runValidators: true,
		}
	);

	res.status(200).json({
		satus: 'success',
		message: 'Expense added successfully',
	});
};

module.exports = addExpense;
