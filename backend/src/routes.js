import { Router } from 'express';

import PessoaController from './app/controllers/PessoaController';
import ImovelController from './app/controllers/ImovelController';

const routes = new Router();

routes.get('/grower', PessoaController.index);
routes.post('/grower', PessoaController.store);
routes.put('/grower/:id', PessoaController.update);
routes.delete('/grower/:id', PessoaController.delete);

routes.get('/properties', ImovelController.index);
routes.post('/properties', ImovelController.store);
routes.delete('/properties/:id', ImovelController.delete);

export default routes;
