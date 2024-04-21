import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Fork {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    compression: number;

    @Column()
    rebound: number;

    @Column()
    icsSpring: number;

    @Column()
    oilLevel: number;

    @Column()
    springRate: number;

    @Column()
    springLength: number;

    @Column()
    springPreload?: number;
    
    @Column()
    preloadAdj: number;

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