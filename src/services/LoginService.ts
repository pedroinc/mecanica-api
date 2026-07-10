import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/UserRepository';
import { auth } from '../config/messages';

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

const userRepository = new UserRepository();

type LoginInput = {
  email: string;
  password: string;
};

class LoginService {
  async execute({ email, password }: LoginInput) {
    if (!email) throw Error(auth.error.EMAIL_EMPTY);

    if (!password) throw Error(auth.error.PASSWORD_EMPTY);

    const user = await userRepository.findByEmail(email);
    if (!user) throw Error(auth.error.USER_BY_EMAIL_NOT_FOUND);

    const isCorrectPassword = compareSync(password, user.password);

    if (!isCorrectPassword) throw Error(auth.error.EMAIL_OR_PASSWORD_INVALID);

    const token = jwt.sign({ _id: user.id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    } as jwt.SignOptions);

    const { password: _password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

export default LoginService;
