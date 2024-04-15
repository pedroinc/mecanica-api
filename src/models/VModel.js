const { Model, DataTypes } = require('sequelize');

class VModel extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        allowNull: false,
        vbrandId: DataTypes.UUIDV4,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = VModel;
