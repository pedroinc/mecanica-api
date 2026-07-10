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

import Repair from './Repair';

@Entity('repair_item_tasks')
class RepairItemTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price!: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Repair, (repair) => repair.repairItemTasks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'repair_id' })
  repair!: Repair | null;

  @RelationId((repairItemTask: RepairItemTask) => repairItemTask.repair)
  repairId!: string | null;
}

export default RepairItemTask;
