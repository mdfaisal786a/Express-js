import express, { Request, Response, NextFunction } from "express";

import errorHandler from "./middlewares/errorHandler.middleware";

// @types/pkg_name

//* importing routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/auth.routes";

//* express app
const app = express();

//! using middlewares
app.use(express.json());
app.use("/api/v1/uploads", express.static("uploads"));

//* error handler
app.use(errorHandler);
//* health

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running",
    success: true,
    status: "success",
    data: null,
  });
});
//! using routes
// v1 , v2

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
// app.use("v2/auth", authRoutes);

//* path not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`can not ${req.method} on  ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  error.success = false;
  next(error);
});
export default app;
