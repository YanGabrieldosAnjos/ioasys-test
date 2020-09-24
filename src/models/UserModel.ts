import { Column, Entity } from "typeorm";
import  BaseModel from "./BaseModel";

@Entity({name: "users"})
export class UserModel extends BaseModel{
    @Column()
    name!: string;

    @Column({type: "text", unique: true})
    username!: string;
    
    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    isAdmin!: boolean;
}
