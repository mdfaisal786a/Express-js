import express from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.middleware";
import { loginValidator } from "../validators/auth.validator";
import uploader from "../middlewares/multer.middleware";

const router = express.Router();
const upload = uploader();

//* register

router.post("/register", upload.single("profile_image"), register);

//* login

router.post("/login", validate(loginValidator), login);

//* change password

//* change profile image

router.post("/profile-image", upload.single("profile_image"), (req, res) => {
  console.log(req.file);

  res.json({
    message: "Profile image uploaded successfully",
    file: req.file,
  });
});

export default router;
