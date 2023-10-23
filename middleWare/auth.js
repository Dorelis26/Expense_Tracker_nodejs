const jsonwebtoken = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const acessToken = req.headers.authorization.replace('Bearer ', '');
		const jwt_payload = jsonwebtoken.verify(acessToken, process.env.jwt_salt);

		req.user = jwt_payload;
	} catch (e) {
		res.status(400).json({
			status: 'failed',
			message: 'unauthorized',
		});
		return;
	}
	next();
};
module.exports = auth;
