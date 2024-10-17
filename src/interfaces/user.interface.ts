import mongoose from "mongoose";

export type IFile = {
  size: string;
  name: string;
  type: string;
  url: string;
  id: string;
};

export type IAccess = {
  assets: mongoose.Types.ObjectId[];
  services: mongoose.Types.ObjectId[];
};

export type IUser = {
  firstName: string;
  lastName: string;
  profilePicture: IFile;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  access: IAccess;
};

