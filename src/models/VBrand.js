const { Model, DataTypes } = require('sequelize');

class VBrand extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.VBrand, { foreignKey: 'vbrand_id', as: 'vbrand' });
  }
}

module.exports = VBrand;
