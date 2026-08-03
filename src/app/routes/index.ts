import express from "express";
import jobRoutes from "../modules/job/job.route";
import applicationRoutes from "../modules/application/application.route";
import authRoutes from "../modules/user/user.route";
import companyRoutes from "../modules/company/company.route";
const router = express.Router();

router.use("/user", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/applications", applicationRoutes);
router.use("/companies", companyRoutes);

export default router;