import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import cors from "cors";
import bookRouter from "./routes/book.route";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import { CustomError } from "./errors/custom.error";

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(morgan("tiny"));
app.use(
  cookieSession({
    signed: false,
    secure: false,
    sameSite: "lax",
  })
);

app.get("/api/users/health", (_req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api", bookRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeErrors() });
  }
  console.log(err);

  res.status(500).send({
    success: false,
    message: "Something went wrong",
  });
});

export { app };
