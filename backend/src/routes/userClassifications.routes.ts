import { Router } from 'express';
import { createClassification,
    getClassificationById,
    getClassifications,
    deleteClassificationById,
    updateClassificationById } from '../controllers/userClassification.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken], getClassifications);
router.get("/:classificationId", [verifyToken], getClassificationById);
router.post("/", [verifyToken, isAdmin], createClassification);
router.put("/:classificationId", [verifyToken, isAdmin], updateClassificationById);
router.delete("/:classificationId", [verifyToken, isAdmin], deleteClassificationById);

export default router;
