import { EntityRepository, Repository } from "typeorm";
import { IMovieFilter } from "../controllers/movie";
import { MovieModel } from "../models/MovieModel";

@EntityRepository(MovieModel)
export class MovieRepository extends Repository<MovieModel> {
    async filterMovies(filter: IMovieFilter): Promise<MovieModel[]>{

        const {actors, director, genre} = filter;
        const query =  this.createQueryBuilder().select();
        query.leftJoinAndSelect("MovieModel.votes", "vote");
        query.leftJoinAndSelect("MovieModel.actors","actors")
         if(actors){
            query.andWhere(`"actors".name IN (:...name)`, {name: actors.map(({name}) => name)})
            
        }            
        if(director){
            query.andWhere(`director = :director`);
        }

        if(genre){
            query.andWhere(`genre = :genre`);
        }

        

       
        return query.setParameters({director, genre}).getMany();
              
    }
}