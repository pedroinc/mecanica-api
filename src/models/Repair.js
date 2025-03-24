const { Model, DataTypes } = require('sequelize');

class Repair extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT('long'),
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0,
        },
        vehicleId: DataTypes.UUID,
        customerId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Repair;
