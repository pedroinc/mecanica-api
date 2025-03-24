const { compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

const UserRepository = require('../repositories/UserRepository');
const { auth } = require('../config/messages');

const userRepository = new UserRepository();

class LoginService {
  async execute({ email, password }) {
    if (!email) throw Error(auth.error.EMAIL_EMPTY);

    if (!password) throw Error(auth.error.PASSWORD_EMPTY);

    const user = await userRepository.findByEmail(email, true);
    if (!user) throw Error(auth.error.USER_BY_EMAIL_NOT_FOUND, user);

    const isCorrectPassword = compareSync(password, user.password);

    if (!isCorrectPassword) throw Error(auth.error.EMAIL_OR_PASSWORD_INVALID);

    const token = jwt.sign({ _id: user.id }, jwtSecret, {
      expiresIn: jwtExpiresIn,
      // expiresIn: 0,
    });

    delete user.password;

    return { user, token };
  }
}

module.exports = LoginService;
