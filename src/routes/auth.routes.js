import { Router } from "express";
import {changeCurrentPassword, forgotPasswordRequest, getCurrentUser, login, logoutUser, refreshAccessToken, registerUser, resendEmailVeification, verifyEmail,resetForgotPassword} from "../controllers/auth.controllers.js";
import { validate } from "../middleswares/validator.middleware.js";
import { userChangeCurrentPasswordValidator, userLoginValidator, userRegisterValidator,userForgotPasswordValidator,userResetForgotPasswordValidator } from "../validators/index.js";
import { verifyJWT } from "../middleswares/auth.middleware.js";


const router = Router();

//unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);

router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(),validate,resetForgotPassword);
//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-apssword").post(verifyJWT, userChangeCurrentPasswordValidator(),validate,changeCurrentPassword);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVeification);

export default router; 