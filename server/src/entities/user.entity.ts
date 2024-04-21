import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import Role from './role.entity';

@Entity()
export default class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @ManyToOne(() => Role, (role) => role.users)
    role?: Role;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    surname?: string;

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