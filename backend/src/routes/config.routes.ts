import { Router } from 'express';
import { createConfig,
    getConfigs,
    updateConfigById,
    updateAllFields,
    getHolidays,
    updateHolidays,
    closeMonth } from '../controllers/config.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';

const router = Router();

// Rutas para gestionar días festivos (deben ir antes de las rutas con parámetros)
router.get("/holidays", [verifyToken], getHolidays);
router.put("/holidays", [verifyToken, isAdmin], updateHolidays);

// Cierre de mes manual por el administrador
router.post("/close-month", [verifyToken, isAdmin], closeMonth);

// Rutas generales de configuración
router.get("/", [verifyToken], getConfigs);
router.post("/", [verifyToken, isAdmin], createConfig);
router.put("/", [verifyToken, isAdmin], updateAllFields);
router.put("/:configId", [verifyToken, isAdmin], updateConfigById);

export default router;
