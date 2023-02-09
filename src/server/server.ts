import express from "express";
import { StatusCodes } from "http-status-codes";

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    return res.send("Funciona!");
});

server.get("/teste", (req, res) => {
    return res.status(StatusCodes.FORBIDDEN).send("Erro!");
});

server.post("/", (req, res) => {
    return res.json(req.body);
});

export { server };
