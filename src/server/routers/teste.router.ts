import { Router } from 'express';
import { TesteController } from '../controllers';
import { filterValidator, idValidator } from '../middleware/validations.middleware';

const testeRouter = Router();

testeRouter.get('/', filterValidator, TesteController.get);
testeRouter.get('/:id', idValidator, TesteController.getById);
testeRouter.post('/', TesteController.testeBodyValidator, TesteController.create);
testeRouter.put('/:id',  idValidator,  TesteController.testeBodyValidator, TesteController.update);
testeRouter.delete('/:id',  idValidator,  TesteController.del);

export { testeRouter }; 