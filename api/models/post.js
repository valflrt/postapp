const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const postSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	image: {
		type: Boolean,
		default: false
	},
	authorId: {
		type: Types.ObjectId,
		required: true
	},
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
});

module.exports.schema = postSchema;

module.exports.model = mongoose.model("Post", postSchema);