import { Router } from 'express';
import { createVisit,
    getVisitById,
    getVisits,
    deleteVisitById,
    updateVisitById } from '../controllers/visit.controller';
import { isAdmin,isUser, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/", [verifyToken], getVisits);
router.get("/:visitId", [verifyToken], getVisitById);
router.post("/", [verifyToken, isUser], createVisit);
router.put("/:visitId", [verifyToken, isUser], updateVisitById);
router.delete("/:visitId", [verifyToken, isAdmin], deleteVisitById);

export default router;
