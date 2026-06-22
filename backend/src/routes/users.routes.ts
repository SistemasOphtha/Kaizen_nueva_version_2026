import { Router } from 'express';
import { createUser, 
    getUser, 
    getUsers, 
    updateUserById, 
    deleteUserById, 
    deleteUsersBulk,
    restorePassword,
    changePassword,
    approveThird,
    desapproveThird,
    approveThirdsBulk,
    desapproveThirdsBulk,
    getSessionLogs } from '../controllers/user.controller';
import { isAdmin, isCoordinatorOrAdmin, verifyToken } from '../middlewares/authJwt';
import { checkExistingUser } from '../middlewares/verifySignup';

const router = Router();

router.get("/", [verifyToken, isCoordinatorOrAdmin], getUsers);
router.get("/session-logs", [verifyToken, isCoordinatorOrAdmin], getSessionLogs);
router.get("/:userId", [verifyToken, isCoordinatorOrAdmin], getUser);
router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);
router.put("/:userId", [verifyToken, isAdmin], updateUserById); 
router.delete("/:userId", [verifyToken, isAdmin], deleteUserById);
router.post("/bulk-delete", [verifyToken, isAdmin], deleteUsersBulk);

router.post("/:userId/third/:thirdId/approve", [verifyToken, isCoordinatorOrAdmin], approveThird);
router.post("/:userId/third/:thirdId/desapprove", [verifyToken, isCoordinatorOrAdmin], desapproveThird);

router.post("/:userId/thirds/approve-bulk", [verifyToken, isCoordinatorOrAdmin], approveThirdsBulk);
router.post("/:userId/thirds/desapprove-bulk", [verifyToken, isCoordinatorOrAdmin], desapproveThirdsBulk);

router.post("/restorePassword", restorePassword);
router.post("/update-password", verifyToken, changePassword);

export default router;
