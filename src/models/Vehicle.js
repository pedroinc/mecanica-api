const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        plate: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: DataTypes.STRING,
        vin: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        modelYear: DataTypes.INTEGER,
        factoryYear: DataTypes.INTEGER,
        vmodelId: DataTypes.UUIDV4,
        customerId: DataTypes.UUIDV4,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Vehicle;
