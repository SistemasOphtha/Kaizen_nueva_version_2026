import { Router } from 'express';
import {
    getUserCategories,
    getUserCategoryById,
    createUserCategory,
    updateUserCategory,
    deleteUserCategory
} from '../controllers/userCategory.controller';
import { verifyToken, isAdmin } from '../middlewares/authJwt';

const router = Router();

router.get('/', verifyToken, getUserCategories);

router.get('/:id', verifyToken, getUserCategoryById);

router.post('/', 
    [verifyToken, isAdmin], 
    createUserCategory
);

router.put('/:id', 
    [verifyToken, isAdmin], 
    updateUserCategory
);

router.delete('/:id', 
    [verifyToken, isAdmin], 
    deleteUserCategory
);

export default router;
