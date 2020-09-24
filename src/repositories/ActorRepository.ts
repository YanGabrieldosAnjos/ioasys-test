import { EntityRepository, Repository } from "typeorm";
import { ActorModel } from "../models/ActorModel";

@EntityRepository(ActorModel)
export class ActorRepository extends Repository<ActorModel> {}