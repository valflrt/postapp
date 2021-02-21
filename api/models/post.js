const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("Post", new Schema({
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
}));