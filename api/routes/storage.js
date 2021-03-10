const router = require('express').Router();
//const fs = require("fs/promises");

/* router.get("/media/:id", async (req, res) => {

	fs.readFile(__dirname + "/../media" + req)

	res.status.send();

}); */

router.use(require('express').static(__dirname + "/../storage"));

module.exports = router;