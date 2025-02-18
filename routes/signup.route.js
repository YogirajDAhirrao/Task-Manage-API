import { Router } from "express";
import signUp from "../controllers/signup.controller.js";

const signUpRouter = Router();

signUpRouter.post("/", signUp);

export default signUpRouter;
