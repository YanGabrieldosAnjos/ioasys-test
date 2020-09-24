import { Column, Entity } from "typeorm";
import  BaseModel  from "./BaseModel";

@Entity({name: "actors"})
export class ActorModel extends BaseModel{
    @Column()
    name!: string
}