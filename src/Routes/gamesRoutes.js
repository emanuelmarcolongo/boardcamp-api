import { Router } from "express";
import { getGames } from "../Controllers/gamesController.js";

const router = Router();


router.get("/games",  getGames);
// router.post("/categories",postCategoriesMiddleware, postCategories );


export default router;