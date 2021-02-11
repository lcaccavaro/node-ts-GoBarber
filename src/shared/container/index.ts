import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';

import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './providers/MailProvider/models/IMailProvider';
import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
