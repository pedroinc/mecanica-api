const { Model, DataTypes } = require('sequelize');

class ServiceItem extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      priceOriginal: DataTypes.DECIMAL,
      priceOthers: DataTypes.DECIMAL,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasOne(models.Service, { foreignKey: 'service_id', as: 'service' })
  }
}

module.exports = ServiceItem;