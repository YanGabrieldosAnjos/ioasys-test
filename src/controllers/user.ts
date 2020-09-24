import { getCustomRepository, getRepository } from "typeorm";
import {UserRepository} from "../repositories";
import * as bcrypt from "bcrypt";
export interface INewUser {
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
} 

interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
}
export class userController {
    userRepository: UserRepository;
    constructor(){
        this.userRepository = getCustomRepository(UserRepository);
    }
    async login(username: string, password: string): Promise<IUser>{
        try{
            const [user] = await this.userRepository.find({username});
        
            if(!await bcrypt.compare(password, user.password)){
                throw new Error("Não encontrado.");
            }
            return user;
        }catch(error){
            throw error;
        }
    }

    async createUser(user: INewUser): Promise<IUser>{
        const cryptedPassword =  await bcrypt.hash(user.password, 10);
        return this.userRepository.save({...user, password: cryptedPassword});
    }

    async updateUser(user: INewUser, id: string){
        const cryptedPassword =  await bcrypt.hash(user.password, 10);
        return this.userRepository.update(id, { ...user, password: cryptedPassword,updatedAt: new Date().toString()})
    }

    async deleteUser(id: string){
        this.userRepository.update(id, {deletedAt: new Date().toString()})
    }

}