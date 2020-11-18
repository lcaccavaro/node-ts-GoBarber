import { Router } from 'express';
import appointmentsRoute from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);

routes.get('/', (request, response) => response.json({ message: 'Hello Server' }));

export default routes;
