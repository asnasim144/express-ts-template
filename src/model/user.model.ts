import mongoose, { Schema, model } from "mongoose";
import { IAccess, IFile, IUser } from "../interfaces/user.interface";
import { serviceSchema } from "./homeComponents.model";
import { assetSchema } from "./asset.model";
// import { string } from "zod";

export const FileSchema = new Schema<IFile>({
  size: String,
  name: String,
  type: String,
  url: String,
  id: String,
});

export const AccessSchema = new Schema<IAccess> ({
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'assets' }],
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'services' }],
})

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    profilePicture: FileSchema,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    access: AccessSchema, 
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const UserModel = model("users", userSchema);

export default UserModel;
