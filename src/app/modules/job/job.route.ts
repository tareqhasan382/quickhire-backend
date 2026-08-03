import { Router } from "express";
import { JobController } from "./job.controller";
import validateRequest from "../../middlewares/validateRequest";
import { JobValidation } from "./job.validation";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "../user/user.constant";

const router = Router();

// Create a job (recruiter or admin)
router.post(
  "/",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  validateRequest(JobValidation.createJobZodSchema),
  JobController.createJob
);

// Public browse
router.get("/featured", JobController.getFeaturedJobs);
router.get("/", JobController.getJobs);

// Recruiter's own jobs
router.get(
  "/mine",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  JobController.getMyJobs
);
router.get("/:id", JobController.getJobById);

// Update / delete (recruiter or admin)
router.patch(
  "/:id",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  validateRequest(JobValidation.updateJobZodSchema),
  JobController.updateJob
);
router.delete(
  "/:id",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  JobController.deleteJob
);

export default router;
