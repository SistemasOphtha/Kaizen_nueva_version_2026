import { Router } from 'express';
import { createRegion,
    getRegionById,
    getRegions,
    deleteRegionById,
    updateRegionById } from '../controllers/region.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken], getRegions);
router.get("/:regionId", [verifyToken], getRegionById);
router.post("/", [verifyToken, isAdmin], createRegion);
router.put("/:regionId", [verifyToken, isAdmin], updateRegionById);
router.delete("/:regionId", [verifyToken, isAdmin], deleteRegionById);

export default router;
