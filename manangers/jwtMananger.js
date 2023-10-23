const jsonwebtoken = require('jsonwebtoken');

const jwtMananger = (user) => {
	const accessToken = jsonwebtoken.sign(
		{
			_id: user._id,
			name: user.name,
		},
		process.env.jwt_salt
	);
	return accessToken;
};

module.exports = jwtMananger;
