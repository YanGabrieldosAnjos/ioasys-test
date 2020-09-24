import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { VoteModel } from "./VoteModel";

@Entity({name: "actors"})
export class ActorModel extends BaseModel{
    @Column()
    name!: string
}