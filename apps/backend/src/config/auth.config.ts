import "dotenv/config";
export const AUTH_CONFIG = {
  SECRET: process.env.SECRET,
  SALT: 10,
};
