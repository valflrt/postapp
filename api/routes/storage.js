const router = require('express').Router();

router.use(require('express').static(__dirname + "/../storage"));

module.exports = router;