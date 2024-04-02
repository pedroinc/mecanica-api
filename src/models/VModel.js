const { Model, DataTypes } = require("sequelize");

class VModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        vbrand_id: DataTypes.UUIDV4,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Vehicle, { foreignKey: "vmodel_id", as: "vmodel" });
  }
}

module.exports = VModel;