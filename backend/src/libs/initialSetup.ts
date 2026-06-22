import User from '../models/User';
import { ADMIN_EMAIL, ADMIN_FIRSTH_NAME, ADMIN_LAST_NAME, ADMIN_PASSWORD } from '../config';

const createAdmin = async (): Promise<void> => {
  // check for an existing admin user
  const userFound = await (User as any).findOne({
    where: {
       email: ADMIN_EMAIL
    }
  });
  console.log(userFound);
  if (userFound) return;

  // create a new admin user
  const newUser = await (User as any).create({
    firstName: ADMIN_FIRSTH_NAME,
    lastName: ADMIN_LAST_NAME,
    email: ADMIN_EMAIL,
    password: await (User as any).prototype.encryptPassword(ADMIN_PASSWORD),
    classificationId: 1 // 1 represents Administrador classification in Kaizen
  });

  console.log(`new user created: ${newUser.email}`);
};

export default createAdmin;
