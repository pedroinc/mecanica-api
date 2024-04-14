const CustomerRepository = require("../repositories/CustomerRepository");

const customerRepository = new CustomerRepository();

class CreateCustomerService {
  async execute(newCustomer) {
    if (!newCustomer.email) throw Error('The email cannot be empty!');

    const customer = await customerRepository.findByEmail(newCustomer.email);
    if (customer) {
      throw Error('This email is already registered!');
    }
    // is valid email
    await customerRepository.create(newCustomer);
  }
}

module.exports = CreateCustomerService;
