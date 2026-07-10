import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Vehicle from './Vehicle';
import Repair from './Repair';
import { DATETIME_COLUMN_TYPE } from './column-types';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', nullable: true })
  cellphone!: string | null;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email!: string | null;

  @Column({ name: 'date_of_birth', type: DATETIME_COLUMN_TYPE, nullable: true })
  dateOfBirth!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles!: Vehicle[];

  @OneToMany(() => Repair, (repair) => repair.customer)
  repairs!: Repair[];
}

export default Customer;
