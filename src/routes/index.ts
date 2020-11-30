import { Router } from 'express';
import appointmentsRoute from './appointments.routes';
import usersRoute from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoute);

routes.get('/', (request, response) => response.json({ message: 'Hello Server' }));

export default routes;
