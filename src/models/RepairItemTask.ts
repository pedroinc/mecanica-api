import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class RepairItemTask extends Model<
  InferAttributes<RepairItemTask>,
  InferCreationAttributes<RepairItemTask>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare price: CreationOptional<number>;
  declare discount: CreationOptional<number>;
  declare repairId: CreationOptional<string>;

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
        },
        description: {
          type: DataTypes.TEXT('long'),
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        repairId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

export default RepairItemTask;
