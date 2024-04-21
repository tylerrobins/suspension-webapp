import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Shock {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    compLS: number;

    @Column()
    compHS: number;

    @Column()
    rebLS: number;

    @Column()
    txn: number;

    @Column()
    gasPressure: number;

    @Column()
    springRate: number;

    @Column()
    springLenght: number;

    @Column()
    springPreload: number;

    @Column()
    preloadAdj: number;

    @Column()
    tos: number;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt!: Date;

    @BeforeInsert()
    updateCreatedAt() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
    };

    @BeforeUpdate() 
    updateUpdatedAt() {
        this.updatedAt = new Date()
    };
}