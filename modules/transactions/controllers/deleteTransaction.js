const mongoose = require('mongoose');
const validator = require('validator');
const userModel = mongoose;

const deleteTransaction = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');
	const { transaction_id } = req.params;
	const userModel = mongoose.model('users');

	if (!validator.isMongoId(transaction_id.toString()))
		throw 'please provide a valid id';

	const getTransaction = await transactionsModel.findOne({
		_id: transaction_id,
	});
	if (!getTransaction) throw 'Transacion Not Found';

	if (getTransaction.transaction_type === 'income') {
		//income logic
		await userModel.updateOne(
			{
				_id: getTransaction.user_id,
			},
			{
				$inc: {
					balance: getTransaction.amount * -1,
				},
			},
			{
				runValidators: true,
			}
		);
	} else {
		//expense logic
		await userModel.updateOne(
			{
				_id: getTransaction.user_id,
			},
			{
				$inc: {
					balance: getTransaction.amount,
				},
			},
			{
				runValidators: true,
			}
		);
	}
	await transactionsModel.deleteOne({
		_id: transaction_id,
	});

	res.status(200).json({
		status: 'Deleted Successfully',
	});
};
module.exports = deleteTransaction;
