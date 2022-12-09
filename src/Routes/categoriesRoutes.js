import { Router } from "express";
import { getCategories, postCategories } from "../Controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories );
router.post("/categories", postCategories );


export default router;