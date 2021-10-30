const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		require: [true, 'User must have userName'],
	},
	passWord: {
		type: String,
		required: [true, 'User must have passWord'],
	},
});
const User = mongoose.model('User', userSchema);
module.exports = User;
