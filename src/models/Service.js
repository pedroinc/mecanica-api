
const { Model, DataTypes } = require('sequelize');

class Service extends Model {
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
    this.hasOne(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' })
    this.hasOne(models.Customer, { foreignKey: 'customer_id', as: 'customer' })
    this.hasMany(models.ServiceItem, { foreignKey: 'service_item_id', as: 'service_item' })
  }
}

module.exports = Service;