import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/categories", CategoryController.findAll);

export default router;
