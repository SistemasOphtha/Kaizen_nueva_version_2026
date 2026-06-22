import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.prod' });
} else {
  dotenv.config({ path: './.env.dev' });
}

export const DB_HOST = process.env.MYSQLDB_HOST || "";
export const DB_NAME = process.env.MYSQLDB_DATABASE || "";
export const DB_USER = process.env.MYSQLDB_USER || "";
export const DB_PASSWORD = process.env.MYSQLDB_PASSWORD || "";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);

export const PORT = parseInt(process.env.NODE_LOCAL_PORT || "4001", 10);
export const SECRET = process.env.SECRET || "FdxJP%v7732WLPb3";
export const SECRET_REFRESH = process.env.SECRET_REFRESH || "Cu8$8UqCXDXtzdoF";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jrodriguez@codemasterdev.co";
export const ADMIN_FIRSTH_NAME = process.env.ADMIN_FIRSTH_NAME || "Jhordan";
export const ADMIN_LAST_NAME = process.env.ADMIN_LAST_NAME || "Rodriguez";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Cmdev2023*";
