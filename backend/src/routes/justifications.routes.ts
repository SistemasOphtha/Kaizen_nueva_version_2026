import { Router } from 'express';
import { createJustification,
    getJustificationById,
    getJustifications,
    deleteJustificationById,
    updateJustificationById } from '../controllers/justification.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getJustifications);
router.get("/:justificationId", [verifyToken], getJustificationById);
router.post("/", [verifyToken, isUser], createJustification);
router.put("/:justificationId", [verifyToken, isUser], updateJustificationById);
router.delete("/:justificationId", [verifyToken, isAdmin], deleteJustificationById);

export default router;
