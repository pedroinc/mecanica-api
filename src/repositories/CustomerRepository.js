const Customer = require('../models/Customer');

class CustomerRepository {
  async findByEmail(email) {
    return await Customer.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id) {
    return await Customer.findOne({
      where: {
        id,
      },
    });
  }

  async listAll() {
    return await Customer.findAll({ limit: 10, order: [['name', 'asc']] });
  }

  async create(customer) {
    return await Customer.create(customer);
  }
}

module.exports = CustomerRepository;
