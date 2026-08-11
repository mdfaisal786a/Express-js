import mongoose from "mongoose";

export const connectDatabase = (DB_URI: string) => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("__________ database connection error ________");
      console.log(error);
    });
};
