import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class Customer extends Model<
  InferAttributes<Customer>,
  InferCreationAttributes<Customer>
> {
  declare id: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare cellphone: CreationOptional<string>;
  declare email: CreationOptional<string | null>;
  declare dateOfBirth: CreationOptional<Date | null>;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        cellphone: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        dateOfBirth: DataTypes.DATE,
      },
      {
        sequelize,
      },
    );
  }
}

export default Customer;
