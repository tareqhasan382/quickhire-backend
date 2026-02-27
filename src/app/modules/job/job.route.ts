import { Router } from "express";
import { JobController } from "./job.controller";
import validateRequest from "../../middlewares/validateRequest";
import { JobValidation } from "./job.validation";

const router = Router();

router.post("/", validateRequest(JobValidation.createJobZodSchema), JobController.createJob);
router.get("/", JobController.getJobs);
router.get("/:id", JobController.getJobById);
router.patch("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

export default router;