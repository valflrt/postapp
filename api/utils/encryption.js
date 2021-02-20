const bcrypt = require("bcrypt");

const hash = (toHash = "") => bcrypt.hashSync(toHash, 10);

const compare = (toCompare = "", hash = "") => bcrypt.compareSync(toCompare, hash);

module.exports = { hash, compare };