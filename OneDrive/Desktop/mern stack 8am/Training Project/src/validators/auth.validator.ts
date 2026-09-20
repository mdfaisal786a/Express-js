import * as z from "zod";

export const loginValidator = z.object({
  // body
  body: z.object({
    email: z.email("invalid email format"),
    password: z.string("password must be a string."),
  }),
  // params
  // query
});
