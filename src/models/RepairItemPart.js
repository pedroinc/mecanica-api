const { Model, DataTypes } = require('sequelize');

class RepairItemPart extends Model {
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
        numItems: {
          type: DataTypes.SMALLINT,
        },
        priceAuthentic: {
          type: DataTypes.DECIMAL(10, 2),
        },
        priceNotAuthentic: {
          type: DataTypes.DECIMAL(10, 2),
        },
        useAuthentic: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        repairId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = RepairItemPart;
