import { EntityRepository, Repository } from "typeorm";
import { IMovieFilter } from "../controllers/movie";
import { MovieModel } from "../models/MovieModel";

@EntityRepository(MovieModel)
export class MovieRepository extends Repository<MovieModel> {
    async filterMovies(filter: IMovieFilter): Promise<MovieModel[]>{

        const {actors, director, genre} = filter;
        const query =  this.createQueryBuilder().select();
        if(director){
            query.andWhere(`director = :director`);
        }

        if(genre){
            query.andWhere(`genre = :genre`);
        }

        if(actors){
            query.leftJoin("movies.actors", "actor");
            for(const actor of actors){
                query.andWhere("actors.name = :name", {name: actor.name})
            }
        }            
        return query.setParameters({director, genre}).getMany();
              
    }
}