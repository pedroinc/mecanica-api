const { compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const UserRepository = require('../repositories/UserRepository');

const userRepository = new UserRepository();

class LoginService {
  async execute({ email, password }) {
    if (!email) throw Error('The email cannot be empty!');

    if (!password) throw Error('The password cannot be empty!');

    // TODO validate email and password

    const user = await userRepository.findByEmail(email);
    if (!user) throw Error('Error while logging user!');

    const isCorrectPassword = compareSync(password, user.password);

    if (!isCorrectPassword) throw Error('Email or password invalid!');

    const token = jwt.sign(
      { _id: user.id }, jwt_secret,
      {
        expiresIn: '24h',
      }
    );
    return { token };
  }
}

module.exports = LoginService;
