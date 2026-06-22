import { Router } from 'express';
import { createLabel,
    getLabels,
    updateLabelById,
    deleteLabelCustomById,
    getEvents } from '../controllers/calendar.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

router.get("/labels", [verifyToken], getLabels);
router.post("/labels", [verifyToken, isAdmin], createLabel);
router.put("/labels/:labelId", [verifyToken, isAdmin], updateLabelById);
router.delete("/labels/:labelId", [verifyToken, isAdmin], deleteLabelCustomById);

router.get("/events", [verifyToken], getEvents);

export default router;
