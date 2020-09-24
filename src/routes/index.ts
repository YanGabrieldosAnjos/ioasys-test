import { Router } from "express";
import user from "./user";
import movie from "./movie";

const routes = Router();

routes.use("/user", user);
routes.use("/movie", movie);

export default routes;
