import { Router } from "express";
import { CompanyController } from "./company.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CompanyValidation } from "./company.validation";
import { authVerify } from "../../middlewares/authVerify";
import { ENUM_ROLE } from "../user/user.constant";

const router = Router();

// Create a company profile (recruiter or admin)
router.post(
  "/",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  validateRequest(CompanyValidation.createCompanyZodSchema),
  CompanyController.createCompany
);

// Public browse
router.get("/", CompanyController.getCompanies);

// Recruiter's own company profile
router.get(
  "/mine",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  CompanyController.getMyCompanies
);
router.patch(
  "/mine",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  validateRequest(CompanyValidation.updateCompanyZodSchema),
  CompanyController.updateMyCompany
);

router.get("/:id", CompanyController.getCompanyById);

// Update (recruiter or admin)
router.patch(
  "/:id",
  authVerify(ENUM_ROLE.RECRUITER, ENUM_ROLE.ADMIN),
  validateRequest(CompanyValidation.updateCompanyZodSchema),
  CompanyController.updateCompany
);

// Delete (admin only)
router.delete("/:id", authVerify(ENUM_ROLE.ADMIN), CompanyController.deleteCompany);

export default router;
