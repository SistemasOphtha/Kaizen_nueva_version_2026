import { Router } from 'express';
import { createThird, 
    getThirdById, 
    getThirds,
    updateThirdById, 
    deleteThirdById,
    deleteThirdsBulk,
    checkThirdById,
    assignThirdPortfolio,
    unassignThirdPortfolio,
    unassignThirdPortfolioByAdmin,
    assignThirdPortfolioByAdmin,
    assignOrCreateThird,
    unassignThirdsPortfolioByAdminBulk,
    assignThirdsPortfolioByAdminBulk,
    uploadHabeasData,
    saveSignature } from '../controllers/third.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';
import multer from 'multer';

const upload = multer({ dest: 'uploads/temp/' });
const router = Router();

router.get("/", [verifyToken], getThirds);
router.get("/:thirdId", [verifyToken], getThirdById);
router.post("/", [verifyToken, isUser], createThird);
router.put("/:thirdId", [verifyToken, isUser], updateThirdById);
router.delete("/:thirdId", [verifyToken, isAdmin], deleteThirdById);
router.post("/bulk-delete", [verifyToken, isAdmin], deleteThirdsBulk);

router.get("/check/:identification", [verifyToken], checkThirdById);
router.post("/assign/:thirdId", [verifyToken], assignThirdPortfolio);
router.post("/unassign/:thirdId", [verifyToken], unassignThirdPortfolio);
router.post("/unassign/:thirdId/:userId", [verifyToken, isAdmin], unassignThirdPortfolioByAdmin);
router.post("/assign/:thirdId/:userId", [verifyToken, isAdmin], assignThirdPortfolioByAdmin);
router.post("/assign-or-create", [verifyToken, isAdmin], assignOrCreateThird);
router.post("/unassign-bulk/:userId", [verifyToken, isAdmin], unassignThirdsPortfolioByAdminBulk);
router.post("/assign-bulk/:userId", [verifyToken, isAdmin], assignThirdsPortfolioByAdminBulk);

// Rutas de Habeas Data e Firma Digital
router.post("/:thirdId/habeas-data", [verifyToken, upload.single('file')], uploadHabeasData);
router.post("/:thirdId/signature", [verifyToken], saveSignature);

export default router;
