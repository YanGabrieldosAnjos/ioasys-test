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
        const {actors} = movie;

        for(const actor of actors){
            await this.actorRepository.save(actor);
        }
        return this.movieRepository.save({...movie, actors});

    }

    async voteMovie(userId: string, movieId: string, score: number ){
        try{
            const user = await this.userRepository.findOne({id:userId});
            const movie = await this.movieRepository.findOne({id: movieId});
            if(score < 1 || score > 5){
                throw new Error(`Voto invalido`)
            }
            this.voteRepository.save({user, movie, score })
        }catch(error){
            throw error;
        }
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