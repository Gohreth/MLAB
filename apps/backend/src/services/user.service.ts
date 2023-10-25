import db from "../database";
import { AlreadyExistsError } from "../errors/alreadyExists.error";
import { NotAuthorizedError } from "../errors/notAuthorized.error";
import { NotFoundError } from "../errors/notFound.error";
import { IUserParams } from "../types/user";
import { Password } from "../utils/password.util";

export class UserService {
  static async signUp({ username, email, password }: IUserParams) {
    try {
      if (await db.user.findOne({ where: { email } }))
        throw new AlreadyExistsError("User already exists");
      const user = await db.user.create({ username, email, password });
      const { password: userPassword, ...response } = user;
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async signIn({ email, password }: IUserParams) {
    try {
      const user = await db.user.findOne({ where: { email } });
      if (!user)
        throw new NotFoundError(`User with email ${email} doesn't exists`);
      if (!(await Password.compare(user.password, password))) {
        throw new NotAuthorizedError("Bad credentials");
      }
      const { password: userPassword, ...response } = user;
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
