import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import VehicleBrand from './VehicleBrand';

@Entity('vehicle_models')
class VehicleModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => VehicleBrand, (vehicleBrand) => vehicleBrand.vehicleModels, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'vehicle_brand_id' })
  vehicleBrand!: VehicleBrand | null;

  @RelationId((vehicleModel: VehicleModel) => vehicleModel.vehicleBrand)
  vehicleBrandId!: string | null;
}

export default VehicleModel;
