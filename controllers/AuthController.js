const User = require('../models/User');
const bcrypt = require('bcryptjs');
exports.signUp = async (req, res) => {
	const { userName, passWord } = req.body;
	const hashPassWord = await bcrypt.hash(passWord, 12);
	try {
		const newUser = await User.create({ userName, passWord: hashPassWord });
		req.session.user = newUser;
		res.status(201).json({
			status: 'success',
			data: {
				user: newUser,
			},
		});
	} catch (e) {
		res.status(400).json({
			status: 'failed',
		});
	}
};
exports.signIn = async (req, res) => {
	const { userName, passWord } = req.body;
	try {
		const user = await User.findOne({ userName });
		if (!user) {
			return res.status(401).json({
				status: 'success',
				message: 'not found user',
			});
		}
		const isCorrect = await bcrypt.compare(passWord, user.passWord);
		if (isCorrect) {
			req.session.user = user;
			res.status(200).json({ status: 'success' });
		} else {
			res.status(400).json({ status: 'fail', message: 'incorrect username or password' });
		}
	} catch (e) {
		res.status(400).json({
			status: 'failed',
		});
	}
};

exports.protectUser = (req, res, next) => {
	const { user } = req.session;
	if (!user) {
		return res.status(401).json({ status: 'fail', message: 'Un Authorization' });
	}
	req.user = user;
	next();
};
