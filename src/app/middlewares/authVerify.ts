import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";

export const authVerify =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;

      // Expect "Bearer <token>"
      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
      }

      const token = authorization.split(" ")[1];

      let verifiedUser: JwtPayload;
      try {
        verifiedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
      } catch {
        throw new Error("Invalid or expired token");
      }

      req.user = verifiedUser; // { userId, email, role }

      const { role } = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new Error("Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
