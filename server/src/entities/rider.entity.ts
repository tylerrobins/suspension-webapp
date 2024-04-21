import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Rider {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;
    
    @Column()
    weight: number;

    @Column()
    level: string;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @Column({default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
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