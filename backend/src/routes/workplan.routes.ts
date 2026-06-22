import { Router } from 'express';
import { createWorkplan,
    getWorkplanById,
    getWorkplans,
    deleteWorkplanById,
    updateWorkplanById } from '../controllers/workplan.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getWorkplans);
router.get("/:workplanId", [verifyToken], getWorkplanById);
router.post("/", [verifyToken, isUser], createWorkplan);
router.put("/:workplanId", [verifyToken, isUser], updateWorkplanById);
router.delete("/:workplanId", [verifyToken, isAdmin], deleteWorkplanById);

export default router;
