import { Router } from "express";
import { getCategories, postCategories } from "../Controllers/categoriesController.js";
import { postCategoriesMiddleware } from "../Middlewares/categoriesMiddlewares.js";

const router = Router();


router.get("/categories", getCategories );
router.post("/categories",postCategoriesMiddleware, postCategories );


export default router;