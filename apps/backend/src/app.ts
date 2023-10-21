import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.get("/api/users/health", (_req: Request, res: Response) => {
  res.send("OK");
});

app.all("*", (_req: Request, _res: Response) => {
  throw new Error("Route not found");
});

export { app };
