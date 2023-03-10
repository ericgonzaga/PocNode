import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { pessoaRouter  } from './routers';

const version = process.env.npm_package_version;

const server = express();

server.use(cors({ origin: process.env.ENABLED_CORS?.split(';') || [] }));
server.use(express.json());

server.get('/', (req, res) => {
    return res.redirect('/info');
});

server.get('/info', (req, res) => {
    return res.status(StatusCodes.OK).send(`Version ${version}`);
});

server.use('/pessoa', pessoaRouter);

export { server };


