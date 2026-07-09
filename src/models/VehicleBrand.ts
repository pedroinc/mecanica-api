import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class VehicleBrand extends Model<
  InferAttributes<VehicleBrand>,
  InferCreationAttributes<VehicleBrand>
> {
  declare id: CreationOptional<string>;
  declare name: string;

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
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
      },
    );
  }
}

export default VehicleBrand;
