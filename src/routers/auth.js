import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserController, loginUserController, logoutUserController, refreshUserController } from "../controllers/auth.js";
import { registerUserSchema, loginUserSchema} from "../validation/auth.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));
authRouter.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post("/refresh", ctrlWrapper(refreshUserController));
authRouter.post("/logout", ctrlWrapper(logoutUserController));
