const bcrypt = require("bcrypt");

const hash = (toHash = "") => bcrypt.hash(toHash, 20);

const compare = (toCompare = "", hash = "") => bcrypt.hash(toCompare, hash);

module.exports = { hash, compare };