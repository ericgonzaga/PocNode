import { Router } from 'express';
import { PessoaController } from '../controllers';
import { ValidationsMiddleware, AuthenticationMiddleware } from '../middleware';

const pessoaRouter = Router();

pessoaRouter.get('/', ValidationsMiddleware.filterValidator, PessoaController.list);
pessoaRouter.get('/:id', ValidationsMiddleware.idValidator, PessoaController.getById);
pessoaRouter.post('/', AuthenticationMiddleware.test, PessoaController.createValidator, PessoaController.create);
pessoaRouter.put('/:id',  AuthenticationMiddleware.test, PessoaController.updateValidator, PessoaController.update);
pessoaRouter.delete('/:id', AuthenticationMiddleware.test, ValidationsMiddleware.idValidator,  PessoaController.deleteById);

export { pessoaRouter }; 