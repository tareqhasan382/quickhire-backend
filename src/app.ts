import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000","https://quickhire-frontend-pfxp.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: 200, message: "Our server is Running 🚀" });
});

// 404 handler
app.use(notFound);

// ✅ Global error handler — MUST have 4 params for Express to treat it as error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);

  const statusMap: Record<string, number> = {
    "Email already exists": 409,
    "Company with this name already exists": 409,
    "You have already applied to this job": 409,
    "Invalid credentials": 401,
    "Unauthorized": 401,
    "Invalid or expired token": 401,
    "Incorrect password": 401,
    "Forbidden": 403,
    "Account suspended": 403,
    "No account found with this email": 404,
    "User not found": 404,
    "Job not found": 404,
    "Company not found": 404,
    "Application not found": 404,
  };
  const statusCode = statusMap[err.message] || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;