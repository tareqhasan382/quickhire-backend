import { Router } from "express";
import { ApplicationController } from "./application.controller";
import { ApplicationValidation } from "./application.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "../user/user.interface";
const router = Router();

// Create a new application with validation
router.post(
  "/",
  authVerify(ENUM_ROLE.USER),
  validateRequest(ApplicationValidation.createApplicationZodSchema),
  ApplicationController.createApplication
);

// Get all applications (with optional pagination)
router.get("/", ApplicationController.getApplications);

// Get single application by ID
router.get("/:id", ApplicationController.getApplicationById);

// Update application by ID
router.patch("/:id", ApplicationController.updateApplication);

// Delete application by ID
router.delete("/:id", ApplicationController.deleteApplication);

export default router;