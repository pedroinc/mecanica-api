const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        plate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
        },
        vin: {
          type: DataTypes.STRING,
        },
        modelYear: {
          type: DataTypes.INTEGER,
          // validate: {
          //   isInt: true,
          // }
        },
        factoryYear: {
          type: DataTypes.INTEGER,
          // validate: {
          //   isInt: true,
          // }
        },
        vehicleModelId: DataTypes.UUID,
        customerId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Vehicle;
