/**
 * Rutas para la gestión de portafolios
 */
import { Router } from 'express';
import { getPortfolioByThirdId,
  getUserPortfolio,
  createOrUpdatePortfolio,
  getPortfolioThirds } from '../controllers/portfolio.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';

const router = Router();

// Rutas para portafolios por tercero
router.get("/third/:thirdId", [verifyToken], getPortfolioByThirdId);

// Rutas para portafolios por usuario
router.get("/user", [verifyToken], getUserPortfolio); // Portafolio del usuario actual
router.get("/user/:userId", [verifyToken, isAdmin], getUserPortfolio); // Portafolio de un usuario específico (solo admin)
router.post("/user", [verifyToken], createOrUpdatePortfolio); // Crear/actualizar portafolio del usuario actual
router.post("/user/:userId", [verifyToken, isAdmin], createOrUpdatePortfolio); // Crear/actualizar portafolio de un usuario específico (solo admin)

// Rutas para terceros en portafolios
router.get("/thirds", [verifyToken], getPortfolioThirds); // Terceros en el portafolio del usuario actual
router.get("/thirds/:userId", [verifyToken, isAdmin], getPortfolioThirds); // Terceros en el portafolio de un usuario específico (solo admin)

export default router;
