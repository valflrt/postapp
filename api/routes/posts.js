const Post = require("../models/post");
const User = require("../models/user");

const router = require('express').Router();

// get all posts

router.get("/get", async (req, res) => {
	try {
		res.status(200).json(await Post.find());
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// get information about one post by id

router.get("/get/:id", async (req, res) => {
	try {
		res.status(200).json(await Post.findById(req.params.id));
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// create a post

router.post("/post", async (req, res) => {
	try {
		let { description, authorId, imageId } = req.query;

		let authorFromDB = await User.findById(authorId);
		//let imageFromDB = await Image.findByID(imageId);

		let post = await new Post({ description: description, author: authorFromDB/*, image: imageFromDB*/ }).save();
		res.status(200).json({ message: "added successfully", post });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

// update a post

router.put("/put/:id", async (req, res) => {
	try {

		let { description } = req.query;

		let post = await Post.findById(req.params.id);

		if (description) post.description = description;

		await post.save();
		res.status(200).json({ message: "updated successfully", post });

	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// delete a post

router.delete("/delete/:id", async (req, res) => {
	try {
		await Post.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

module.exports = router;