import { CustomError } from "./custom.error";

export class AlreadyExistsError extends CustomError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }

  statusCode = 409;
  serializeErrors() {
    return [{ message: this.message }];
  }
}
