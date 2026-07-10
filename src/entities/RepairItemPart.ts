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

@Entity('repair_item_parts')
class RepairItemPart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'num_items', type: 'smallint', nullable: true })
  numItems!: number | null;

  @Column({ name: 'price_authentic', type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceAuthentic!: number | null;

  @Column({
    name: 'price_not_authentic',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceNotAuthentic!: number | null;

  @Column({ name: 'use_authentic', type: 'boolean', default: true })
  useAuthentic!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Repair, (repair) => repair.repairItemParts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'repair_id' })
  repair!: Repair | null;

  @RelationId((repairItemPart: RepairItemPart) => repairItemPart.repair)
  repairId!: string | null;
}

export default RepairItemPart;
