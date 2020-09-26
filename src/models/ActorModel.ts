import { Column, Entity, ManyToMany } from "typeorm";
import  BaseModel  from "./BaseModel";
import { MovieModel } from "./MovieModel";

@Entity({name: "actors"})
export class ActorModel extends BaseModel{
    @Column()
    name!: string

    @ManyToMany(type => MovieModel, movie => movie.actors)
    movies!: MovieModel[]
}