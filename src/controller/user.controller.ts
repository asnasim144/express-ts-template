import { Request, Response } from "express";
import BaseController from "../shared/baseController";
import httpStatus from "http-status";
import { UserService } from "../service/user.service";
import mongoose from "mongoose";
import { allowedUserUpdates, UserFields } from "../constants/user.constant";

class Controller extends BaseController {
  getAllUsers = this.catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully found the users list",
      data: result,
    });
  });

  getUserById = this.catchAsync(async (req: Request, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const result = await UserService.getUserById(userId);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully found the user",
      data: result,
    });
  })

  provideAccess = this.catchAsync(async (req: Request, res: Response) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const accessData = req.body;

    const result = await UserService.provideAccess(userId, accessData);
    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully provided access to the user",
      data: result,
    });
  })

  createUser = this.catchAsync(async (req: Request, res: Response) => {
    const fields = Object.keys(req.body);
    for (const field of fields) {
      if (!allowedUserUpdates.has(field as UserFields)) {
        return this.sendResponse(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          message: `Invalid field`,
        });
      }
    }
    
    const result = await UserService.createUser(req.body);

    this.sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Successfully created a new user",
      data: result,
    });
  })

  login = this.catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully logged in",
      data: result,
    });
  });
}

export const UserController = new Controller();
