import { Router } from 'express';
import appointmentsRoute from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import sessionsRoute from '../../../../modules/users/infra/http/routes/sessions.routes';
import usersRoute from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Server' }),
);

export default routes;
