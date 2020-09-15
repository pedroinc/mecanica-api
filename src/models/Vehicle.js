
const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
  static init(sequelize) {
    super.init({
      licensePlate: DataTypes.STRING,
      name: DataTypes.STRING,
      vin: DataTypes.STRING,
      year: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' })
  }
}

module.exports = Vehicle;