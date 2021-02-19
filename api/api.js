const express = require("express");
const cors = require("cors");
const database = require("mongoose");

// config file

const config = require("./config.json");

// database handlers

const posts = require("./routes/posts");
const users = require("./routes/users");

// connect to the database

database
	.connect("mongodb://localhost/main", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connected to the database\n");
	})
	.catch(err => {
		console.error("Failed to connect to the database:");
		console.error(err);
	});

// app

const app = express();

// cros origin

app.use(cors());

// log every request

app.use((req, res, next) => {
	console.log(req.path);
	next();
});

// routes

app.use("/posts", posts);
app.use("/users", users);

// api routes

app.get("/", async (req, res) => {
	try {
		res.status(200).json({ message: "This is a simple management api" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

app.get("/test", async (req, res) => {
	try {
		res.status(200).json({ message: "it works !" });
	} catch (err) {
		res.status(500).json({ error: err });
	};
});

// 404 status code message

app.use((req, res) => {
	res.status(404).json({ code: 404, error: "page not found" });
});

// listen at config.port

app.listen(config.port, () => {
	console.table(`Api started at port ${config.port}`);
});