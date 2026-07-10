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

import Vehicle from './Vehicle';
import Customer from './Customer';
import RepairItemTask from './RepairItemTask';
import RepairItemPart from './RepairItemPart';

@Entity('repairs')
class Repair {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true })
  total!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.repairs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle!: Vehicle | null;

  @RelationId((repair: Repair) => repair.vehicle)
  vehicleId!: string | null;

  @ManyToOne(() => Customer, (customer) => customer.repairs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer | null;

  @RelationId((repair: Repair) => repair.customer)
  customerId!: string | null;

  @OneToMany(() => RepairItemTask, (repairItemTask) => repairItemTask.repair)
  repairItemTasks!: RepairItemTask[];

  @OneToMany(() => RepairItemPart, (repairItemPart) => repairItemPart.repair)
  repairItemParts!: RepairItemPart[];
}

export default Repair;
