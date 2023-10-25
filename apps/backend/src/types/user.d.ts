//Attributes that defines an user
export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
}

//Attributes that defines an user response (omits password)
export type IUserResponse = Omit<IUser, "password">;

//Attributes that defines the parameters to create an user (omits id)
export type IUserParams = Omit<IUser, "id">;

//Attributes that defines a logged in user (includes token)
export type ILoggedUser = IUser & {
  token: string;
};
