import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class Repair extends Model<
  InferAttributes<Repair>,
  InferCreationAttributes<Repair>
> {
  declare id: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare discount: CreationOptional<number>;
  declare total: CreationOptional<number | null>;
  declare vehicleId: CreationOptional<string>;
  declare customerId: CreationOptional<string>;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        description: {
          type: DataTypes.TEXT('long'),
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          defaultValue: 0,
        },
        vehicleId: DataTypes.UUID,
        customerId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

export default Repair;
