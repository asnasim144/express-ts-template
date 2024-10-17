import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/error";
import JwtHelpers from "../shared/jwtHelpers";

// Define a custom type for extending the Request object
type CustomRequest = Request & {
  user_id?: string;
  email?: string;
  role?: string;
};

// Define a custom type for extending the JWT Payload object
type CustomJWTPayload = JwtPayload & {
  user_id?: string;
  email?: string;
  role?: string;
};

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const isVerified: CustomJWTPayload | null = JwtHelpers.verifyToken(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as Secret
    );
    if (!isVerified) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    } else {
      // Assign custom properties to the req object
      req.user_id = isVerified?.user_id as string;
      req.email = isVerified?.email as string;
      req.role = isVerified?.role as string;

      next();
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Token not found");
  }
};

export default verifyToken;
