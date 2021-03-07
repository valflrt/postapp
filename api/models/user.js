const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = require("./post").schema;

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
	posts: {
		type: Map,
		of: postSchema,
		default: new Map()
	},
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports = mongoose.model("User", userSchema);