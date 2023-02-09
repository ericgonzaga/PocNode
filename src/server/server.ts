import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { testeRouter  } from './routers/teste.router';

const version = process.env.npm_package_version;

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    return res.redirect('/info');
});

server.get('/info', (req, res) => {
    return res.status(StatusCodes.OK).send(`Versão ${version}`);
});

server.use('/teste', testeRouter);

export { server };
