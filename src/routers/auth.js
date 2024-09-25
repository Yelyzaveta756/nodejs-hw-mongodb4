import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserController } from "../controllers/auth.js";
import { registerUserSchema } from "../validation/auth.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));

