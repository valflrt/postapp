const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("Image", new Schema({
	timeStamps: {
		createdAt: {
			type: Date,
			default: Date.now()
		}
	}
}));