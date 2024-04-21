import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Bike {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    bikeName: string; // to be changed

    @Column()
    bikeYear: string; // to be changed
    // link to a bike model that has all of the bike models, years, makes etc. then remove bikeName and bikeYear

    @Column()
    discipline: string;

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