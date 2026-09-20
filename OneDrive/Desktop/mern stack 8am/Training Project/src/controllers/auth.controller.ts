import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendresponse .utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { Request } from "express";

//* register
export const register = catchAsync(async (req: Request, res) => {
  const { full_name, email, password, phone } = req.body;
  const file = req.file;

  console.log(file);

  if (!full_name) {
    throw new AppError("full_name is required", 400);
  }
  if (!email) {
    throw new AppError("email is required", 400);
  }
  if (!password) throw new AppError("password is required", 400);

  //* user instance
  const user = new User({ full_name, email, phone });

  //* hash password
  const hash = await hashPassword(password);
  user.password = hash;

  //todo: upload profile image
  if (file) {
    user.profile_image = file?.path;
  }

  //* save user
  await user.save();

  //* convert user mongoose doc to js object
  const { password: _, ...rest } = user.toObject();

  //* success response
  sendResponse(res, {
    message: "account created",
    statusCode: 201,
    data: rest,
  });
});

//* login
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new AppError("email is required", 400);

  if (!password) throw new AppError("password is required", 400);

  //* find user by email
  const user = await User.findOne({ email }).select("+password");

  //* if !user throw error
  if (!user) throw new AppError("invalid email or password", 400);

  //* compare password
  const isPassMatched = await comparePassword(password, user.password);

  //* if !pass_matched throw error
  if (!isPassMatched) throw new AppError("invalid email or password", 400);

  //* jwt token
  const access_token = generateJwtToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  //* convert user mongoose doc to js object
  const { password: _, ...rest } = user.toObject();

  //* success response
  sendResponse(res, {
    message: "login successful",
    statusCode: 201,
    data: {
      user: rest,
      access_token,
    },
  });
});

//* get profile
export const getProfile = catchAsync(async (req, res) => {
  //
});

//* change password

//* forgot password
