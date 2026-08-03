import { Router } from "express";
import { ApplicationController } from "./application.controller";
import { ApplicationValidation } from "./application.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "../user/user.constant";

const router = Router();

// Create a new application (candidate only)
router.post(
  "/",
  authVerify(ENUM_ROLE.CANDIDATE),
  validateRequest(ApplicationValidation.createApplicationZodSchema),
  ApplicationController.createApplication
);

// My applications (candidate only) — must be defined before "/:id"
router.get("/me", authVerify(ENUM_ROLE.CANDIDATE), ApplicationController.getMyApplications);

// Withdraw my application (candidate only) — must be defined before "/:id"
router.delete("/me/:id", authVerify(ENUM_ROLE.CANDIDATE), ApplicationController.withdrawMyApplication);

// Applications for the recruiter's own jobs — must be defined before "/:id"
router.get(
  "/recruiter",
  authVerify(ENUM_ROLE.RECRUITER),
  ApplicationController.getRecruiterApplications
);

// Get all applications (admin only)
router.get("/", authVerify(ENUM_ROLE.ADMIN), ApplicationController.getApplications);

// Get single application by ID (admin only)
router.get("/:id", authVerify(ENUM_ROLE.ADMIN), ApplicationController.getApplicationById);

// Recruiter updates application status for one of their jobs
router.patch(
  "/:id/status",
  authVerify(ENUM_ROLE.RECRUITER),
  validateRequest(ApplicationValidation.updateApplicationStatusZodSchema),
  ApplicationController.updateApplicationStatus
);

// Update application by ID (admin only)
router.patch(
  "/:id",
  authVerify(ENUM_ROLE.ADMIN),
  validateRequest(ApplicationValidation.updateApplicationZodSchema),
  ApplicationController.updateApplication
);

// Delete application by ID (admin only)
router.delete("/:id", authVerify(ENUM_ROLE.ADMIN), ApplicationController.deleteApplication);

export default router;
