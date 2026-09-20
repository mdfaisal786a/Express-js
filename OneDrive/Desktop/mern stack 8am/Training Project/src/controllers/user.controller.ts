import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendresponse .utils";

export const getAllUsers = catchAsync(async (req, res) => {
  const filter: any = {};
  const { role } = req.query;

  if (role) {
    filter.role = role;
  }

  const users = await User.find(filter);

  sendResponse(res, {
    message: `All ${role ?? "Users"} fetched`,
    data: users,
    statusCode: 200,
  });
});

// export const getAllHosts = catchAsync(async (req, res) => {
//   const hosts = await User.find({ role: Role.HOST });

//   sendResponse(res, {
//     message: "All Hosts fetched",
//     data: hosts,
//     statusCode: 200,
//   });
// });
