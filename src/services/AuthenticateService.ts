import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from "../models/User";

import authConfig from '../config/auth.config';

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw Error('Invalid Email or Password');
    }

    const passwordMatched = await compare(password, user.password!);

    if (!passwordMatched) {
      throw Error('Invalid Email or Password');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticateService;