import { Router } from 'express';
import { getQuicks } from '../controllers/quick.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken, isAdmin], getQuicks);

export default router;
