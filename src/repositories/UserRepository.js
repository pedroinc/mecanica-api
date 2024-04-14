const User = require('../models/User');

class UserRepository {
  // async listAll() {
  //   return await User.findAll({ limit: 10, order: [ ['name', 'asc'] ] });
  // }

  async findByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  async create(user) {
    return await User.create(user);
  }
}

module.exports = UserRepository;
