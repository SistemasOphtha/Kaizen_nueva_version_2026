import { Router } from 'express';
import { createType,
    getTypeById,
    getTypes,
    deleteTypeById,
    updateTypeById } from '../controllers/thirdType.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getTypes);
router.get("/:classificationId", [verifyToken], getTypeById);
router.post("/", [verifyToken, isAdmin], createType);
router.put("/:classificationId", [verifyToken, isAdmin], updateTypeById);
router.delete("/:classificationId", [verifyToken, isAdmin], deleteTypeById);

export default router;
