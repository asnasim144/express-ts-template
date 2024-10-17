/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import User from "../model/user.model";
import ApiError from "../interfaces/error";
import mongoose from "mongoose";
import { IAccess, IUser } from "../interfaces/user.interface";
import bcrypt from "bcryptjs"

class Service {
  async getAllUsers() {
    const result = await User.find();
    
    return result;
  }

  async getUserById(userId: mongoose.Types.ObjectId) {
    const user = await User.findById(userId)
    .select({
      password: 0,
    });
    
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    
    return user;
  }

  async provideAccess (userId: mongoose.Types.ObjectId, data: IAccess) {
    const user = await User.findByIdAndUpdate(userId, { access: data }, { new: true });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

  async createUser(data:IUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(email:string, password:string) {
    const user = await User.findOne({ email })
    .select(["email", "profilePicture", "password"]);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    // @ts-ignore
    delete user?.password;

    return {
      id: user._id,
      email: user.email,
    };

  }
}

export const UserService = new Service();
