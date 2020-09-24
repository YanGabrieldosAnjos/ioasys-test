import { Router, Request, Response} from "express";
import { INewUser, userController } from "../controllers/index";

const router = Router();
const user =  new userController();

router.post("/login", async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;

        res.send(await user.login(username, password));
    }catch(error){
        throw new Error(`Erro interno.`);
    }
});


router.post("/create", async (req: Request, res: Response) =>{
    try{
        const {
            name,
            username,
            email,
            password,
            isAdmin
        } = req.body;

        res.send(user.createUser({password, name, email, username, isAdmin}));

    }catch(error){
        throw new Error(`Erro interno.`);
    }
});

interface IUserParams extends INewUser{
    id: string;
}

router.put("/update", async (req: Request, res: Response) =>{
    try{
        const userReceived: IUserParams = req.body; 

        return user.updateUser({...userReceived}, userReceived.id);

    }catch(error){
        throw new Error(`Erro interno.`);
    }
});

router.delete("/delete", async (req: Request, res: Response) =>{
    try{
        const userId: string = req.body; 

        await user.deleteUser(userId);
        res.send({deleted: "ok"})
    }catch(error){
        throw new Error(`Erro interno.`);
    }
});

export default router;