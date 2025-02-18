import { Router } from "express";
import handleLogin from "../controllers/login.controller.js";

const loginRouter = Router();

loginRouter.post("/", handleLogin);

export default loginRouter;
