import { type } from "os";
import { Column,  Entity,  JoinColumn,  ManyToOne,  MongoCallback,  OneToOne,  PrimaryGeneratedColumn, Timestamp } from "typeorm";
import BaseModel from "./BaseModel";
import { MovieModel } from "./MovieModel";
import { UserModel } from "./UserModel";

@Entity({name: "votes"})
export class VoteModel extends BaseModel{
    @OneToOne(type => UserModel)
    @JoinColumn()
    user!: UserModel

    @Column()
    score!: number;

    @ManyToOne(type => MovieModel, movie => movie.votes)
    movie!: MovieModel;
}