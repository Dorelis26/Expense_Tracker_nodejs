const nodemailer = require('nodemailer');

const emailMananger = async (to, text, html, subject) => {
	var transport = nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: 'f23777ed0b978f',
			pass: '7ef84415979715',
		},
	});

	await transport.sendMail({
		to: to,
		from: 'info@expenseTraker.com',
		text: text,
		html: html,
		subject: subject,
	});
};
module.exports = emailMananger;
