import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";

export const authVerify =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      // console.log("token:", req.headers);
      // console.log("token:", token);
       if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "You Are Not Authorized" });
      }

      //2 verify token
      let vefifiedUser = null;
      vefifiedUser = jwt.verify(
        token,
        config.jwt.secret as Secret
      ) as JwtPayload;
      req.user = vefifiedUser; // role , userId
      const { role }: any = vefifiedUser;
      // role authorise
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return res.status(403).json("Forbidden");
        //  throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next();
    } catch (error) {
      next(error);
    }
  };