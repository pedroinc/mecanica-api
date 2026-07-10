import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import Customer from './Customer';
import VehicleModel from './VehicleModel';
import Repair from './Repair';

@Entity('vehicles')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  plate!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true })
  vin!: string | null;

  @Column({ name: 'model_year', type: 'int', nullable: true })
  modelYear!: number | null;

  @Column({ name: 'factory_year', type: 'int', nullable: true })
  factoryYear!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer | null;

  @RelationId((vehicle: Vehicle) => vehicle.customer)
  customerId!: string | null;

  @ManyToOne(() => VehicleModel, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'vehicle_model_id' })
  vehicleModel!: VehicleModel | null;

  @RelationId((vehicle: Vehicle) => vehicle.vehicleModel)
  vehicleModelId!: string | null;

  @OneToMany(() => Repair, (repair) => repair.vehicle)
  repairs!: Repair[];
}

export default Vehicle;
