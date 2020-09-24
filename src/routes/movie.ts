import { Router, Request, Response} from "express";
import { IMovie, IMovieFilter, MovieController } from "../controllers";

const router = Router();


router.post("/create", async (req: Request, res: Response) =>{
    const movie = new MovieController();
    try{
        const newMovie: IMovie = req.body;
        res.send(await movie.createMovie(newMovie));
    }catch(error){
        throw error;
    }

});

interface IVoteRequest {
    userId: string;
    movieId: string;
    score: number;
}
router.post("/vote", async (req: Request, res: Response) =>{
    const movie = new MovieController();
    try{
        const {userId, movieId, score}: IVoteRequest = req.body;
        await movie.voteMovie(userId, movieId, score)
        res.send({voted: "ok"});
    }catch(error){
        throw new Error(`Erro interno.`);
    }

});


router.get("/filterMovie", async (req: Request, res: Response) =>{
    const movie = new MovieController();
    try{
        const filter: IMovieFilter = req.body;
        res.json(await movie.getMovie(filter));
    }catch(error){
        throw (error);
    }

});

export default router;