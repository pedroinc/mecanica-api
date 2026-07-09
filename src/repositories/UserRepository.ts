import User from '../models/User';

class UserRepository {
  async findByEmail(email: string, raw = false) {
    return await User.findOne({
      where: {
        email,
      },
      raw,
    });
  }

  async create(user: { name?: string; email: string; password: string }) {
    return await User.create(user);
  }
}

export default UserRepository;
