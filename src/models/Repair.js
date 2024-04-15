const { Model, DataTypes } = require('sequelize');

class Repair extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        description: DataTypes.TEXT('long'),
        discount: DataTypes.DECIMAL,
        total: DataTypes.DECIMAL,
        vehicleId: DataTypes.UUIDV4,
        customerId: DataTypes.UUIDV4,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Repair;
