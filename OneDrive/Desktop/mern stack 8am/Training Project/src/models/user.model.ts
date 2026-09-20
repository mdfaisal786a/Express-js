import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../types/enum.types";

//* interface
interface IUserDocument extends Document {
  full_name: string;
  email: string;
  password: string;
  profile_image?: string;
  phone?: string;
  role: Role;
}
//* user schema
const userSchema = new Schema<IUserDocument>(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      minLength: [3, "full_name must be at least 2 chartacters long"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "user already exits with provided email"],
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(Role), // ['USER, 'ADMIN]
      default: Role.USER,
    },
    profile_image: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

//*

//* user model
const User = mongoose.model<IUserDocument>("user", userSchema);

export default User;
