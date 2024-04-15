const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        dateOfBirth: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = Customer;
