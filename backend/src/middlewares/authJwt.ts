import { Response, NextFunction } from 'express';
import User from '../models/User';
import UserClassification from '../models/UserClassification';

export const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const tokenAuth = req.headers["authorization"];

  if (!tokenAuth) return res.status(403).json({ message: "No token provided" });

  try {
    const token = tokenAuth.split(" ")[1];
    const decoded = (User as any).prototype.validateAuthToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    
    const user = await (User as any).findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: UserClassification
        }
      ]
    });
    if (!user) return res.status(404).json({ message: "No user found" });

    req.userId = decoded.id;
    req.rol = user.dataValues.user_classification.name;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isUser = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await (User as any).findByPk(req.userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });

    if (
      user.dataValues.user_classification.name === "Administrador" ||
      user.dataValues.user_classification.name === "Usuario" ||
      user.dataValues.user_classification.name === "Representante" ||
      user.dataValues.user_classification.name === "Coordinador"
    ) {
      next();
      return;
    }

    return res.status(403).json({ message: "Require User Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await (User as any).findByPk(req.userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });

    if (user.dataValues.user_classification.name === "Administrador") {
      next();
      return;
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isRepre = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await (User as any).findByPk(req.userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });

    if (user.dataValues.user_classification.name === "Representante") {
      next();
      return;
    }

    return res.status(403).json({ message: "Requiere rol representante" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isCoordinator = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await (User as any).findByPk(req.userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });

    if (user.dataValues.user_classification.name === "Coordinador") {
      next();
      return;
    }

    return res.status(403).json({ message: "Requiere rol coordinador" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

export const isCoordinatorOrAdmin = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await (User as any).findByPk(req.userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });

    if (
      user.dataValues.user_classification.name === "Coordinador" ||
      user.dataValues.user_classification.name === "Administrador"
    ) {
      next();
      return;
    }

    return res.status(403).json({ message: "Requiere rol coordinador o administrador" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
