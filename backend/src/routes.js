import { Router } from 'express';

import PessoaController from './app/controllers/PessoaController';
import ImovelController from './app/controllers/ImovelController';

const routes = new Router();

routes.get('/grower', PessoaController.index);
routes.post('/grower', PessoaController.store);

routes.get('/properties', ImovelController.index);
routes.post('/properties', ImovelController.store);

export default routes;
