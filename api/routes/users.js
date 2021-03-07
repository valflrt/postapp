const router = require('express').Router();

// local modules

const User = require("../models/user");
const Post = require("../models/post").model;

const encryption = require("../utils/encryption");
const objectId = require("../utils/objectId");

// show all users

router.get("/all/get", async (req, res) => {
	try {
		User.find((err, users) => {
			res.status(200).json(users.map(user => {
				return {
					id: user._id,
					username: user.username,
					bio: user.bio,
					timeStamps: user.timeStamps
				};
			}));
		});
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// show one user by id

router.get("/one/:id/get", async (req, res) => {
	try {
		User.findById(req.params.id, (err, user) => {
			if (user === undefined) res.status(400).json({ error: "user does not exist" });
			res.status(200).json({
				id: user._id.toString(),
				username: user.username,
				bio: user.bio,
				posts: user.posts,
				timeStamps: user.timeStamps
			});
		});
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// add a new user to the database

router.get("/one/create", async (req, res) => {
	new User({
		username: req.query.username,
		password: encryption.hash(req.query.password),
		bio: req.query.bio
	}).save()
		.then(user => res.status(200).json({
			message: "user added successfully",
			user
		}))
		.catch(err => res.status(500).json({ error: err }));
});

// update an user

router.get("/one/:id/update", async (req, res) => {
	try {

		let { username, password, bio } = req.query;
		let user = await User.findById(req.params.id);

		if (username) user.username = username;
		if (password) user.password = password;
		if (bio) user.bio = bio;

		await user.save();
		res.status(200).json({ message: "updated successfully", user });

	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// delete an user

router.get("/one/:id/delete", async (req, res) => {
	try {
		await User.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

router.get("/one/:id/posts/all/get", async (req, res) => {
	try {
		let { text, image } = req.query;

		let author = await User.findById(req.params.id);

		let posts = await author.posts;

		res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

router.get("/one/:id/posts/one/:postId/get", async (req, res) => {
	try {
		let { text, image } = req.query;

		let author = await User.findById(req.params.id);

		let post = await author.posts.get(req.params.postId);

		res.status(200).json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

router.get("/one/:id/posts/one/create", async (req, res) => {
	try {
		let { text, image } = req.query;

		let author = await User.findById(req.params.id);

		let post = new Post({
			text: text,
			image: image,
			authorId: author._id
		});

		await author.posts.push(post);

		await author.save();
		await post.save();

		res.status(200).json({ message: "added successfully", post });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

router.get("/one/:id/posts/one/:postId/delete", async (req, res) => {
	try {
		let author = await User.findById(req.params.id);

		await author.posts.filter(post => post._id !== req.params.postId);
		await Post.findByIdAndDelete(req.params.postId);

		await author.save();

		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	};
});

module.exports = router;