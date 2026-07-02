import { Request, Response } from 'express';
import UserCategory from '../models/UserCategory';
import { validationResult } from 'express-validator';

export const getUserCategories = async (req: Request, res: Response) => {
    try {
        const categories = await UserCategory.findAll({
            order: [['name', 'ASC']]
        });
        res.json({
            success: true,
            data: categories,
            message: "User categories retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching user categories:", error);
        res.status(500).json({
            success: false,
            message: "Error retrieving user categories",
            error
        });
    }
};

export const getUserCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await UserCategory.findByPk(Number(id));
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "User category not found"
            });
        }
        
        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user category",
            error
        });
    }
};

export const createUserCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const categoryData = req.body;
        const newCategory = await UserCategory.create(categoryData);
        
        res.status(201).json({
            success: true,
            data: newCategory,
            message: "User category created successfully"
        });
    } catch (error) {
        console.error("Error creating user category:", error);
        res.status(500).json({
            success: false,
            message: "Error creating user category",
            error
        });
    }
};

export const updateUserCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const categoryData = req.body;
        
        const category = await UserCategory.findByPk(Number(id));
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "User category not found"
            });
        }
        
        await category.update(categoryData);
        
        res.json({
            success: true,
            data: category,
            message: "User category updated successfully"
        });
    } catch (error) {
        console.error("Error updating user category:", error);
        res.status(500).json({
            success: false,
            message: "Error updating user category",
            error
        });
    }
};

export const deleteUserCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await UserCategory.findByPk(Number(id));
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "User category not found"
            });
        }
        
        await category.destroy();
        
        res.json({
            success: true,
            message: "User category deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user category:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting user category",
            error
        });
    }
};
