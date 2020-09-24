import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { ActorModel } from "./ActorModel";
import { BaseModel } from "./BaseModel";
import { VoteModel } from "./VoteModel";

@Entity({name: "movies"})
export class MovieModel extends BaseModel{
    @Column()
    name!: string;

    @Column()
    genre!: string;

    @Column()
    synopsis!: string;

    @Column()
    director!: string;

    @OneToMany(type => VoteModel, vote => vote.movie)
    votes!: VoteModel[];

    @ManyToMany(type => ActorModel)
    actors!: ActorModel[];
}