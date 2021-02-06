import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw Error('Email is already in use');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser as User;
  }
}

export default CreateUserService;
