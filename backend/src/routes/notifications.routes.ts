import { Router } from 'express';
import { getNotifications,
    markNotificationsAsRead,
    markNotificationIdAsRead } from '../controllers/notification.controller';
import { isAdmin, isUser, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken, isAdmin], getNotifications);
router.delete("/", [verifyToken, isAdmin], markNotificationsAsRead);
router.delete("/:id", [verifyToken, isAdmin], markNotificationIdAsRead);

export default router;
