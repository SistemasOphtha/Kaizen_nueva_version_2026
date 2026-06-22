import { Router } from 'express';
import { createSpecialty,
    getSpecialtyById,
    getSpecialtys,
    deleteSpecialtyById,
    updateSpecialtyById } from '../controllers/thirdSpecialty.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getSpecialtys);
router.get("/:specialtyId", [verifyToken], getSpecialtyById);
router.post("/", [verifyToken, isAdmin], createSpecialty);
router.put("/:specialtyId", [verifyToken, isAdmin], updateSpecialtyById);
router.delete("/:specialtyId", [verifyToken, isAdmin], deleteSpecialtyById);

export default router;
