import { Router } from 'express';
import { signinHandler, signupHandler, refreshTokenHandler, signinforTokenHandler, restorePassword, updateUser, signoutHandler, setup2FA, verify2FA, disable2FA, loginVerify2FA, setupEmail2FA, verifyEmail2FA } from '../controllers/auth.controller';
import { checkExistingUser } from '../middlewares/verifySignup';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.use((req: any, res: any, next: any) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", [checkExistingUser], signupHandler);
router.post("/sign-in", signinHandler);
router.post("/sign-out", [verifyToken], signoutHandler);
router.post("/access-token", signinforTokenHandler)
router.post("/refresh-token", refreshTokenHandler)
router.post("/reset-password", restorePassword);

router.post("/user/update", [verifyToken], updateUser);

// 2FA Routes
router.post("/2fa/setup", [verifyToken], setup2FA);
router.post("/2fa/verify", [verifyToken], verify2FA);
router.post("/2fa/disable", [verifyToken], disable2FA);
router.post("/2fa/login-verify", loginVerify2FA);
router.post("/2fa/email/setup", [verifyToken], setupEmail2FA);
router.post("/2fa/email/verify", [verifyToken], verifyEmail2FA);

export default router;
