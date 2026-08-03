import { Router } from "express";
import { UserController } from "./user.controller";
import { authVerify } from "../../middlewares/authVerify";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { ENUM_ROLE } from "./user.constant";

const router = Router();

// Public
router.post(
  "/register",
  validateRequest(UserValidation.registerZodSchema),
  UserController.register
);
router.post(
  "/login",
  validateRequest(UserValidation.loginZodSchema),
  UserController.login
);

// Protected — any authenticated user
router.get(
  "/me",
  authVerify(ENUM_ROLE.ADMIN, ENUM_ROLE.RECRUITER, ENUM_ROLE.CANDIDATE),
  UserController.getMe
);
router.patch(
  "/me",
  authVerify(ENUM_ROLE.ADMIN, ENUM_ROLE.RECRUITER, ENUM_ROLE.CANDIDATE),
  validateRequest(UserValidation.updateMeZodSchema),
  UserController.updateMe
);

// Protected — candidate saved jobs (must be defined before "/:id")
router.get(
  "/me/saved-jobs",
  authVerify(ENUM_ROLE.CANDIDATE),
  UserController.getSavedJobs
);
router.put(
  "/me/saved-jobs/:jobId",
  authVerify(ENUM_ROLE.CANDIDATE),
  UserController.saveJob
);
router.delete(
  "/me/saved-jobs/:jobId",
  authVerify(ENUM_ROLE.CANDIDATE),
  UserController.unsaveJob
);

// Protected — admin only
router.get("/", authVerify(ENUM_ROLE.ADMIN), UserController.getAllUsers);
router.get("/:id", authVerify(ENUM_ROLE.ADMIN), UserController.getUserById);
router.patch(
  "/:id",
  authVerify(ENUM_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

export default router;
