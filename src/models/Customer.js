
const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      email: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Vehicle, { foreignKey: 'customer_id', as: 'vehicles' })
  }
}

module.exports = Customer;