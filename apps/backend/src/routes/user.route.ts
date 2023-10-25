import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { getCurrentUser } from "../middlewares/getCurrentUser.middleware";
import { requireAuth } from "../middlewares/requireAuth.middleware";

const router = Router();

router.get(
  "/user/currentuser",
  [getCurrentUser, requireAuth],
  UserController.getCurrentUser
);
router.post("/user/signup", UserController.signUp);
router.post("/user/signin", UserController.signIn);
router.post("/user/signout", UserController.signOut);

export default router;
