import express from "express";
import jobRoutes from "../modules/job/job.route";
const router = express.Router();

router.use("/job", jobRoutes);


export default router;