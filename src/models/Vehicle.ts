import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class Vehicle extends Model<
  InferAttributes<Vehicle>,
  InferCreationAttributes<Vehicle>
> {
  declare id: CreationOptional<string>;
  declare plate: string;
  declare name: CreationOptional<string>;
  declare vin: CreationOptional<string>;
  declare modelYear: CreationOptional<number>;
  declare factoryYear: CreationOptional<number>;
  declare vehicleModelId: CreationOptional<string>;
  declare customerId: CreationOptional<string>;

  static initModel(sequelize: Sequelize) {
    return super.init(
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
        },
        factoryYear: {
          type: DataTypes.INTEGER,
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

export default Vehicle;
