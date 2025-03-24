const { Model, DataTypes } = require('sequelize');

class VehicleModel extends Model {
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
          unique: true,
        },
        vehicleBrandId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = VehicleModel;
