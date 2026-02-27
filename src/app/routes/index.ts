import express from "express";
import jobRoutes from "../modules/job/job.route";
import applicationRoutes from "../modules/application/application.route";
import authRoutes from "../modules/user/user.route";
const router = express.Router();

router.use("/user", authRoutes);
router.use("/job", jobRoutes);
router.use("/application", applicationRoutes);


export default router;