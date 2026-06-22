import { Router } from 'express';
import { trackingAlert,
    filterImpacts,
    reportsWidget,
    impactsWidget,
    thirdImpactsReport,
    reportImpactsByUser } from '../controllers/widget.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

// Ruta para obtener datos de alertas de seguimiento
router.get("/pending-visits", [verifyToken], trackingAlert);

// Rutas para impactos
router.post("/impacts/filter", [verifyToken], filterImpacts);
router.get("/impacts", [verifyToken], impactsWidget);

// Ruta para reportes de terceros
router.get("/reports", [verifyToken], reportsWidget);

// Rutas para exportar reportes
router.get("/export/impacts", [verifyToken], thirdImpactsReport);
router.get("/export/reports", [verifyToken], reportImpactsByUser);

// Las siguientes rutas han sido comentadas porque las funciones ya no existen en el controlador refactorizado
// router.get("/thirds/notvisited/lastmonth", [verifyToken], getThirdNotVisitLastMonth);
// router.get("/thirds/notvisited/currentmonth", [verifyToken], getThirdNotVisitLastMonth);

export default router;
