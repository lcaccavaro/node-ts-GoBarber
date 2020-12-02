import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from "../models/User";

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

    const token = sign(
      {},
      '6b87ad8c76d313c3247a96ee3078a43e',
      {
        subject: user.id
      }
    );

    return {
      user,
      token
    };
  }
}

export default AuthenticateService;