import { Router } from 'express';
import { createTypeEvent,
    getTypeEventById,
    getTypeEvents,
    deleteTypeEventById,
    updateTypeEventById } from '../controllers/typeEvent.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken], getTypeEvents);
router.get("/:typeEventId", [verifyToken], getTypeEventById);
router.post("/", [verifyToken, isAdmin], createTypeEvent);
router.put("/:typeEventId", [verifyToken, isAdmin], updateTypeEventById);
router.delete("/:typeEventId", [verifyToken, isAdmin], deleteTypeEventById);

export default router;
