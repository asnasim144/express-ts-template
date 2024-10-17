import { Router } from "express";
import { UserController } from "../controller/user.controller";
const router = Router();

router.get(
  "/",
  UserController.getAllUsers
);

router.post(
  "/provide-access/:userId",
  UserController.provideAccess
);

router.post(
  "/create",
  UserController.createUser
);

router.get(
  "/:userId",
  UserController.getUserById
);

router.post(
  "/login",
  UserController.login
);

export const userRoutes = router;
