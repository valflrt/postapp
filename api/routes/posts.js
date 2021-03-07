const Post = require("../models/post").model;

const router = require('express').Router();

// get all posts

router.get("/all/get", async (req, res) => {
	try {
		res.status(200).json(await Post.find());
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// get information about one post by id

router.get("/one/:id/get", async (req, res) => {
	try {
		res.status(200).json(await Post.findById(req.params.id));
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// update a post

router.get("/one/:id/update", async (req, res) => {
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

router.get("/one/:id/delete", async (req, res) => {
	try {
		await Post.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

module.exports = router;