const Post = require("../models/post").model;
const User = require("../models/user");

const router = require('express').Router();

// get all posts

router.get("/all/get", async (req, res) => {
	try {
		res.status(200).json(await Post.find());
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// get one post with different methods

router.get("/one/get/:id", async (req, res) => {
	try {
		res.status(200).json(await Post.findById(req.params.id));
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// get several posts with different methods

router.get("/complex/get/:type/:data", async (req, res) => {

	try {

		switch (req.params.type) {

			case "authorId":
				res.status(200).json(await Post.find({ authorId: req.params.data }));
				break;

			case "text":
				res.status(200).json(await Post.find({ text: new RegExp(req.params.data, "g") }));
				break;

			default:
				res.status(400).json({ message: "unknown type" });
				break;

		};

	} catch (err) {
		res.status(500).json({ error: err });
	};

});

// create a post

router.get("/one/create", async (req, res) => {
	try {

		let { text, authorId, image } = req.query;

		let author = await User.findById(authorId);

		let post = new Post({
			text: text,
			image: image,
			authorId: author._id
		});

		await post.save();

		res.status(200).json({ message: "added successfully", post });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

// update a post

router.get("/one/update/:id", async (req, res) => {
	try {

		let { text } = req.query;

		let post = await Post.findById(req.params.id);

		if (text) post.text = text;

		await post.save();
		res.status(200).json({ message: "updated successfully", post });

	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// delete a post

router.get("/one/delete/:id", async (req, res) => {
	try {
		await Post.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

module.exports = router;