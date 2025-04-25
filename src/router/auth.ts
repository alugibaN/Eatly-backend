import { UserModel } from "../../prisma/zod/user";
import { Router } from "express";
import { createUser, login, refreshToken } from "@/controller/auth";
import { validateUserParams } from "@/middleware/shemaValidete";

const authRouter = Router();

authRouter.post("/auth",   createUser );
authRouter.post("/login", validateUserParams(UserModel), login)
authRouter.post("/refresh", refreshToken)

export default authRouter;
     