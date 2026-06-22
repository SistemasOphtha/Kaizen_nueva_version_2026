import { Response, NextFunction } from 'express';
import User from '../models/User';

export const checkExistingUser = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (req.body.newEmail === undefined || req.body.newEmail === "") {
      const emailFound = await (User as any).findOne({ where: { email: req.body.email } });
      if (emailFound)
        return res.status(400).json({ message: "The user already exists" });
    } else {
      if (req.body.email !== req.body.newEmail) {
        const emailFound = await (User as any).findOne({ where: { email: req.body.newEmail } });
        if (emailFound)
          return res.status(400).json({ message: "The user already exists" });
        req.body.email = req.body.newEmail;
      }
    }

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
