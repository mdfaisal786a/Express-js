import mongoose from "mongoose";
import { Role } from "../types/enum.types";
import jwt from "jsonwebtoken";

type TJwtPayload = {
  _id: mongoose.Types.ObjectId;
  role: Role;
  email: string;
};
//* generate token
export const generateJwtToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, "sdjfh&jhe*$@!ru%473t83UY67t36", {
    expiresIn: "7d",
  });
};

//* verify token
