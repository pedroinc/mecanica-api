const { Model, DataTypes } = require("sequelize");

class Vehicle extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        licensePlate: DataTypes.STRING,
        name: DataTypes.STRING,
        vin: DataTypes.STRING,
        year: DataTypes.STRING,
        vmodel_id: DataTypes.UUIDV4,
        customer_id: DataTypes.UUIDV4,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    this.hasOne(models.VModel, { foreignKey: "vmodel_id", as: "model" });
  }
}

module.exports = Vehicle;