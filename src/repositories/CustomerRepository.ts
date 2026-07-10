import { AppDataSource } from '../database/data-source';
import Customer from '../entities/Customer';

class CustomerRepository {
  private repository = AppDataSource.getRepository(Customer);

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async listAll() {
    return await this.repository.find({ take: 10, order: { name: 'ASC' } });
  }

  async create(customer: {
    name?: string;
    email?: string;
    phone?: string;
    cellphone?: string;
    dateOfBirth?: Date;
  }) {
    const entity = this.repository.create(customer);
    return await this.repository.save(entity);
  }
}

export default CustomerRepository;
