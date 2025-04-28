// /api/index.js
const server = require("./db.js");

module.exports = (req, res) => {
  server(req, res);
};
