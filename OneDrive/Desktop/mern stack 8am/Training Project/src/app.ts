import express, { Request, Response, NextFunction } from "express";

import errorHandler from "./middlewares/errorHandler.middleware.js";

// @types/pkg_name

//* express app
const app = express();

//! using middlewares

//* path not found

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

//* path not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`can not ${req.method} pn ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  error.success = false;
  next(error);
});
export default app;
