const { Model, DataTypes } = require('sequelize');

class RepairItemTask extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT('long'),
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        repairId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = RepairItemTask;
