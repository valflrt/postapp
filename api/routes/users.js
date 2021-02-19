const router = require('express').Router();

// local modules

const User = require("../models/user");
const encryption = require("../utils/encryption");

// show all users

router.get("/getall", async (req, res) => {
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

router.get("/getonebyid/:id", async (req, res) => {
	try {
		User.findById(req.params.id, (err, user) => {
			res.status(200).json({
				id: user._id,
				username: user.username,
				bio: user.bio,
				timeStamps: user.timeStamps
			});
		});
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// add a new user to the database

router.get("/createone", async (req, res) => {
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

router.get("/updateonebyid/:id", async (req, res) => {
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

router.get("/deleteonebyid/:id", async (req, res) => {
	try {
		await User.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({ message: "deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

module.exports = router;