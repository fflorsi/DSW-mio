import { Router } from 'express';
import { sanitizeClientInput, findAll, findOne, add, update, remove, findClientAndPetsByDni } from './client.controler.js';
export const clientRouter = Router();
clientRouter.get('/', findAll);
clientRouter.get('/:id', findOne);
clientRouter.post('/', sanitizeClientInput, add);
clientRouter.put('/:id', sanitizeClientInput, update);
clientRouter.patch('/:id', sanitizeClientInput, update);
clientRouter.delete('/:id', remove);
clientRouter.get('/by-dni/:dni', findClientAndPetsByDni);
//# sourceMappingURL=client.routes.js.map