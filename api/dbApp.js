// /api/db.js
import jsonServer from "json-server";
import { EventEmitter } from "events";

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // ваш файл с данными
const middlewares = jsonServer.defaults();
const emitter = new EventEmitter();

server.use(middlewares);
server.use("/api", router);

server.get("/api", (req, res) => {
  emitter.once("newAccountsData", () => {
    res.status(200).json(router);
  });
});

server.post("/api", (req, res) => {
  const data = req.body;
  emitter.emit("newAccountsData");
  res.status(201).json(data);
});

server.put("/api", (req, res) => {
  const data = req.body;
  emitter.emit("newAccountsData");
  res.status(201).json(data);
});

server.patch("/api", (req, res) => {
  const data = req.body;
  emitter.emit("newAccountsData");
  res.status(201).json(data);
});

server.delete("/api", (req, res) => {
  const data = req.body;
  emitter.emit("newAccountsData");
  res.status(201).json(data);
});

export default server;
