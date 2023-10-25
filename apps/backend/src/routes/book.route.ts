import { Router } from "express";
import { BookController } from "../controllers/book.controller";

const router = Router();

router.get("/books", BookController.findAll);
router.get("/books/:id", BookController.findById);

export default router;
