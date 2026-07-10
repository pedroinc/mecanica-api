import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

class RepairItemPart extends Model<
  InferAttributes<RepairItemPart>,
  InferCreationAttributes<RepairItemPart>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare numItems: CreationOptional<number>;
  declare priceAuthentic: CreationOptional<number>;
  declare priceNotAuthentic: CreationOptional<number>;
  declare useAuthentic: CreationOptional<boolean>;
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
        numItems: {
          type: DataTypes.SMALLINT,
        },
        priceAuthentic: {
          type: DataTypes.DECIMAL(10, 2),
        },
        priceNotAuthentic: {
          type: DataTypes.DECIMAL(10, 2),
        },
        useAuthentic: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        repairId: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }
}

export default RepairItemPart;
