import CustomerRepository from '../repositories/CustomerRepository';

const customerRepository = new CustomerRepository();

type CreateCustomerInput = {
  name?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
  dateOfBirth?: Date;
};

class CreateCustomerService {
  async execute(customer: CreateCustomerInput) {
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

export default CreateCustomerService;
