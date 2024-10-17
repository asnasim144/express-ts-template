import { IUser } from "../interfaces/user.interface";

export type UserFields = keyof IUser

export const allowedUserUpdates = new Set<UserFields>([
    'firstName', 'lastName', 'profilePicture', 'email', 'password', 'phoneNumber', 'address', 'access'
]);
