import Customer from '../models/Customer';

class CustomerRepository {
  async findByEmail(email: string) {
    return await Customer.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await Customer.findOne({
      where: {
        id,
      },
    });
  }

  async listAll() {
    return await Customer.findAll({ limit: 10, order: [['name', 'asc']] });
  }

  async create(customer: {
    name?: string;
    email?: string;
    phone?: string;
    cellphone?: string;
    dateOfBirth?: Date;
  }) {
    return await Customer.create(customer);
  }
}

export default CustomerRepository;
