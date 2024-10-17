/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import ApiError, { IGenericErrorMessage } from "../interfaces/error";
import { errorlogger } from "../shared/logger";
import mongoose from "mongoose";

class ErrorHandler {
  private statusCode: number = 500;
  private message: string = "Something went wrong";
  private errorMessages: IGenericErrorMessage[] = [];

  constructor() {}

  public handleZodValidationError(error: ZodError) {
    const errors: IGenericErrorMessage[] = error.issues.map(
      (issue: ZodIssue) => {
        return {
          path: issue?.path[issue.path.length - 1],
          message: issue?.message,
        };
      }
    );

    this.statusCode = 400;
    this.message = "Validation Error";
    this.errorMessages = errors;
  }

  public handleApiError(error: ApiError) {
    this.statusCode = error?.statusCode || 500;
    this.message = error.message || "Something went wrong";
    this.errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  public handleGenericError(error: Error) {
    this.message = error?.message || "Something went wrong";
    this.errorMessages = error?.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  public handleCastError(error: mongoose.Error.CastError) {
    const errors: IGenericErrorMessage[] = [
      {
        path: error.path,
        message: "Invalid id!",
      },
    ];

    this.errorMessages = errors;
    this.statusCode = 400;
    this.message = `Invalid ${error.path}`;
  }

  public handleValidationError(error: mongoose.Error.ValidationError) {
    const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
      (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: el?.path,
          message: el?.message,
        };
      }
    );
    this.statusCode = 400;
    this.errorMessages = errors;
    this.message = "Validation Error!";
  }

  public globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    errorlogger.error("Global Error Handler", error);

    if (error instanceof ZodError) {
      this.handleZodValidationError(error);
    } else if (error instanceof ApiError) {
      this.handleGenericError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    }

    res.status(this.statusCode).json({
      success: false,
      message: this.message,
      errorMessages: this.errorMessages,
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
    });
  };
}

export default new ErrorHandler();
