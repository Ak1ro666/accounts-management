// /api/index.js
const server = require("./dbApp.js");

module.exports = (req, res) => {
  server(req, res);
};
