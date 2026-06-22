import { Router } from 'express';
import { getCustomReport } from '../controllers/reports.controller';
import { verifyToken } from '../middlewares/authJwt';

const router = Router();

router.use((req: any, res: any, next: any) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/custom", [verifyToken], getCustomReport);

export default router;
