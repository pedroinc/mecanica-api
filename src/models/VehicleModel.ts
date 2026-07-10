import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class VehicleModel extends Model<
  InferAttributes<VehicleModel>,
  InferCreationAttributes<VehicleModel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare vehicleBrandId: CreationOptional<string>;

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
        vehicleBrandId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

export default VehicleModel;
