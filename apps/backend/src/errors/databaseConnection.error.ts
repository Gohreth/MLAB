import { CustomError } from "./custom.error";

export class DatabaseConnectionError extends CustomError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  statusCode = 500;
  serializeErrors() {
    return [{ message: "Error connecting to database" }];
  }
}
