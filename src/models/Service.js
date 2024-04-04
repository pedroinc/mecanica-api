const { Model, DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        vehicle_id: DataTypes.UUIDV4,
        customer_id: DataTypes.UUIDV4,
        total: DataTypes.DECIMAL,
      },
      {
        sequelize,
        modelName: 'Service',
      },
    );
  }

  static associate(models) {
    this.hasOne(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
    this.hasOne(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
    this.hasMany(models.ServiceItem, {
      foreignKey: 'service_item_id',
      as: 'service_item',
    });
  }
}

module.exports = Service;
