import { AppDataSource } from '../database/data-source';
import User from '../entities/User';

class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: { name?: string; email: string; password: string }) {
    const entity = this.repository.create(user);
    return await this.repository.save(entity);
  }
}

export default UserRepository;
