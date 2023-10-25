export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
}
