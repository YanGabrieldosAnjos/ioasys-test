import { getCustomRepository } from "typeorm";
import { UserModel } from "../models";
import {MovieRepository, ActorRepository, VoteRepository, UserRepository} from "../repositories";

interface IActor{
    name: string;
}
export interface IMovie{
    name: string;
    director: string;
    genre: string;
    synopsis: string;
    actors: IActor[];
}

export interface IMovieFilter {
    director: string | null;
    genre: string | null;
    actors: IActor[] | null;
}

interface IMovieDetails extends IMovie{
    scoreTotal: number;
    numberOfVotes: number;
}


export class MovieController {
    movieRepository: MovieRepository;
    voteRepository: VoteRepository;
    userRepository: UserRepository;
    actorRepository: ActorRepository;
    constructor(){
        this.actorRepository = getCustomRepository(ActorRepository);
        this.movieRepository = getCustomRepository(MovieRepository);
        this.voteRepository = getCustomRepository(VoteRepository);
        this.userRepository = getCustomRepository(UserRepository);    
    }
    
    async createMovie(movie: IMovie){
      
        await Promise.all(movie.actors.map(({name}) => this.actorRepository.save({name})));
        return this.movieRepository.save({...movie, actors: movie.actors.map(actor => actor)});

    }

    async voteMovie(userId: string, movieId: string, score: number ){
        const user = await this.userRepository.findOne({id:userId});
        const movie = await this.movieRepository.findOne({id: movieId});
        this.voteRepository.save({user, movie, score })
    }

  
    async getMovie(filter: IMovieFilter): Promise<IMovieDetails[]>{

        const moviesDB = await this.movieRepository.filterMovies(filter);
        return moviesDB.map(movie =>{
            const numberOfVotes = movie.votes? movie.votes.length : 0;
            let votesRate = 0;
            if(movie.votes){
                votesRate = movie.votes.reduce((acc, cur)=> {
                    return  acc + cur.score
                }, 0);
            } 
            return {
                ...movie,
                scoreTotal: votesRate > 0 ?  votesRate/numberOfVotes: 0,
                numberOfVotes
            }
        });     
    }
}