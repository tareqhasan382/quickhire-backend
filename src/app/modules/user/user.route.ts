import { Router } from "express";
import { UserController } from "./user.controller";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "./user.interface";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected routes
router.get("/me", authVerify(ENUM_ROLE.USER,ENUM_ROLE.ADMIN), UserController.getMe);
router.get("/", authVerify(ENUM_ROLE.ADMIN), UserController.getAllUsers); // admin only
router.get("/:id", authVerify(ENUM_ROLE.ADMIN), UserController.getUserById);

export default router;