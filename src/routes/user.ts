import { Router, Request, Response} from "express";
import { INewUser, userController } from "../controllers/index";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;
        const user =  new userController();

        res.json(await user.login(username, password));
    }catch(error){
        throw error;
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
        const user =  new userController();
        
        res.status(201).json(await user.createUser({password, name, email, username, isAdmin}));

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
        const user =  new userController();

        res.json(await user.updateUser({...userReceived}, userReceived.id));

    }catch(error){
        throw new Error(`Erro interno.`);
    }
});

router.delete("/delete", async (req: Request, res: Response) =>{
    try{
        const userId: string = req.body; 
        const user =  new userController();
        
        await user.deleteUser(userId);
        res.json({deleted: "ok"})
    }catch(error){
        throw new Error(`Erro interno.`);
    }
});

export default router;