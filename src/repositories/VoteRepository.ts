import { EntityRepository, Repository } from "typeorm";
import { VoteModel } from "../models/VoteModel";

@EntityRepository(VoteModel)
export class VoteRepository extends Repository<VoteModel> {}