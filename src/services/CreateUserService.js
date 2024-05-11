const { hashSync, genSaltSync } = require('bcryptjs');

const UserRepository = require('../repositories/UserRepository');
const { auth } = require('../config/messages');

const userRepository = new UserRepository();

class CreateUserService {
  async execute({ name, email, password, confirmPassword }) {
    if (!email) throw Error(auth.error.EMAIL_EMPTY);

    if (!password) throw Error(auth.error.PASSWORD_EMPTY);

    if (password !== confirmPassword)
      throw Error(auth.error.PASSWORDS_SHOULD_MATCH);

    const userWithTheSameEmail = await userRepository.findByEmail(email);
    if (userWithTheSameEmail) {
      throw Error(auth.error.EMAIL_ALREADY_REGISTERED);
    }

    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);

    // TODO validate email
    // TODO validate password

    await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

module.exports = CreateUserService;
