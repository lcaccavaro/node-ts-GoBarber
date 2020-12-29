import { getRepository } from "typeorm";
import User from "../models/User";
import { hash } from 'bcryptjs';

interface Request {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserEmailExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserEmailExists) {
      throw Error('Email is already in use');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(newUser);

    return newUser as User;
  }
}

export default CreateUserService;