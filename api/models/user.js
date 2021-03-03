const mongoose = require("mongoose");
const { Schema } = mongoose;

let postSchema = new Schema({
	text: {
		type: String,
		default: null,
		required: true
	},
	author: {
		_id: {
			type: String,
			default: "unknown",
			required: true
		},
		username: {
			type: String,
			default: "unknown",
			required: true
		}
	},
	image: {
		type: Boolean,
		default: false
	},
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
});

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
	posts: [postSchema],
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports = mongoose.model("User", userSchema);