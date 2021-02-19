const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("Post", new Schema({
	description: {
		type: String,
		default: null
	},
	author: {
		_id: {
			type: String,
			default: "unknown"
		},
		username: {
			type: String,
			default: "unknown"
		}
	},
	image: {
		id: {
			type: String
		}
	},
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
}));