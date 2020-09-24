import { Router, Request, Response} from "express";
import { IMovie, IMovieFilter, MovieController } from "../controllers";

const router = Router();
const movie = new MovieController();

router.post("/create", async (req: Request, res: Response) =>{
    try{
        const newMovie: IMovie = req.body;
        res.send(await movie.createMovie(newMovie));
    }catch(error){
        throw new Error(`Erro interno.`);
    }

});

interface IVoteRequest {
    userId: string;
    movieId: string;
    score: number;
}
router.post("/vote", async (req: Request, res: Response) =>{
    try{
        const {userId, movieId, score}: IVoteRequest = req.body;
        await movie.voteMovie(userId, movieId, score)
        res.send({voted: "ok"});
    }catch(error){
        throw new Error(`Erro interno.`);
    }

});

router.post("/vote", async (req: Request, res: Response) =>{
    try{
        const {userId, movieId, score}: IVoteRequest = req.body;
        await movie.voteMovie(userId, movieId, score)
        res.send({voted: "ok"});
    }catch(error){
        throw new Error(`Erro interno.`);
    }

});

router.get("/filterMovie", async (req: Request, res: Response) =>{
    try{
        const filter: IMovieFilter = req.body;
        res.send(await movie.getMovie(filter));
    }catch(error){
        throw new Error(`Erro interno.`);
    }

});

export default router;