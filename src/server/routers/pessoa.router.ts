import { Router } from 'express';
import { PessoaController } from '../controllers';
import { filterValidator, idValidator } from '../middleware/validations.middleware';

const pessoaRouter = Router();

pessoaRouter.get('/', filterValidator, PessoaController.list);
pessoaRouter.get('/:id', idValidator, PessoaController.getById);
pessoaRouter.post('/', PessoaController.createValidator, PessoaController.create);
pessoaRouter.put('/:id',  PessoaController.updateValidator, PessoaController.update);
pessoaRouter.delete('/:id',  idValidator,  PessoaController.del);

export { pessoaRouter }; 