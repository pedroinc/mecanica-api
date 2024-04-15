const { hashSync, genSaltSync } = require('bcryptjs');

const UserRepository = require('../repositories/UserRepository');

const userRepository = new UserRepository();

class CreateUserService {
  async execute({ name, email, password, confirmPassword }) {
    if (!email) throw Error('The email cannot be empty!');

    if (!password) throw Error('The password cannot be empty!');

    if (password !== confirmPassword)
      throw Error('The passwords should be equal!');

    const userWithTheSameEmail = await userRepository.findByEmail(email);
    if (userWithTheSameEmail) {
      throw Error('This email is already registered!');
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
