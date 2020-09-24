import { Column,  PrimaryGeneratedColumn, Timestamp } from "typeorm";


abstract class BaseModel{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Timestamp;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: Timestamp;

    @Column({ type: 'timestamp', nullable: true})
    deletedAt!: Timestamp | null
}

export default BaseModel;