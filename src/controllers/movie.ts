// import { getCustomRepository } from "typeorm";
// import { UserModel } from "../models";
// import {MovieRepository, ActorRepository, VoteRepository, UserRepository} from "../repositories";

// interface IActor{
//     name: string;
// }
// export interface IMovie{
//     name: string;
//     director: string;
//     genre: string;
//     synopsis: string;
//     actors: IActor[];
// }

// export interface IMovieFilter {
//     director: string | null;
//     genre: string | null;
//     actors: IActor[];
// }

// interface IMovieDetails extends IMovie{
//     scoreTotal: number;
//     numberOfVotes: number;
// }
// export class MovieController {
//     movieRepository: MovieRepository;
//     voteRepository: VoteRepository;
//     userRepository: UserRepository;
//     constructor(){
//         this.movieRepository = getCustomRepository(MovieRepository);
//         this.voteRepository = getCustomRepository(VoteRepository);
//         this.userRepository = getCustomRepository(UserRepository);    
//     }
    
//     async createMovie(movie: IMovie){
//         return this.movieRepository.save({...movie});
//     }

//     async voteMovie(userId: string, movieId: string, score: number ){
//         const user = await this.userRepository.findOne({id:userId});
//         const movie = await this.movieRepository.findOne({id: movieId});
//         this.voteRepository.save({user, movie, score })
//     }

//     async getMovie(filter: IMovieFilter): Promise<IMovieDetails[]>{

//         const moviesDB = await this.movieRepository.filterMovies(filter);
        
//         return moviesDB.map(movie =>{
//             const votesRate = movie.votes.reduce((acc, cur)=> {
//                 return  acc + cur.score
//             }, 0); 
//             return {
//                 ...movie,
//                 scoreTotal: votesRate/movie.votes.length,
//                 numberOfVotes: movie.votes.length
//             }
//         });     
//     }
// }