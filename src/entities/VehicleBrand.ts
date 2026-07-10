import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import VehicleModel from './VehicleModel';

@Entity('vehicle_brands')
class VehicleBrand {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => VehicleModel, (vehicleModel) => vehicleModel.vehicleBrand)
  vehicleModels!: VehicleModel[];
}

export default VehicleBrand;
