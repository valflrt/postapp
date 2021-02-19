const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	bio: {
		type: String,
		default: null
	},
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports = mongoose.model("User", userSchema);