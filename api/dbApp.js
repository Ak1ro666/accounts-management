// /api/db.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // ваш файл с данными
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

module.exports = server;
