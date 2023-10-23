const mongoose = require('mongoose');
const validator = require('validator');

const editTransaction = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');

	const { transaction_id, remask, amount, transaction_type } = req.body;

	if (!transaction_id) throw 'Transaction id is required';

	if (transaction_type !== 'income' || transaction_type !== 'expense')
		throw 'Transaction type must be income or expense';

	if (!validator.isMongoId(transaction_id.toString()))
		throw 'please provide a valid id';

	const getTransaction = await transactionsModel.findOne({
		_id: transaction_id,
	});
	if (!getTransaction) throw 'Transacion Not Found';

	await transactionsModel.updateOne(
		{
			_id: transaction_id,
		},
		{
			remarks,
		},
		{
			runValidators: true,
		}
	);

	res.status(200).json({
		status: ' Edited Transaction Successfully',
	});
};

module.exports = editTransaction;
