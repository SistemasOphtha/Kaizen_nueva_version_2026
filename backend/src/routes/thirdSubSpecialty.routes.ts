import { Router } from 'express';
import { createSubSpecialty,
    getSubSpecialtyById,
    getSubSpecialtys,
    deleteSubSpecialtyById,
    updateSubSpecialtyById } from '../controllers/thirdSubSpecialty.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getSubSpecialtys);
router.get("/:subSpecialtyId", [verifyToken], getSubSpecialtyById);
router.post("/", [verifyToken, isAdmin], createSubSpecialty);
router.put("/:subSpecialtyId", [verifyToken, isAdmin], updateSubSpecialtyById);
router.delete("/:subSpecialtyId", [verifyToken, isAdmin], deleteSubSpecialtyById);

export default router;
