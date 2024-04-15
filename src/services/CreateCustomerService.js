const CustomerRepository = require('../repositories/CustomerRepository');

const customerRepository = new CustomerRepository();

class CreateCustomerService {
  async execute(customer) {
    if (!customer.email) throw Error('The email cannot be empty!');

    if (!customer.phone) throw Error('The phone cannot be empty!');

    const customerWithTheSameEmail = await customerRepository.findByEmail(
      customer.email,
    );
    if (customerWithTheSameEmail) {
      throw Error('This email is already registered!');
    }

    // TODO validate email
    return await customerRepository.create(customer);
  }
}

module.exports = CreateCustomerService;
