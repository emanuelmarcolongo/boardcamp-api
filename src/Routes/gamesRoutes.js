import { Router } from "express";
import { getGames, postGames } from "../Controllers/gamesController.js";
import { postGamesMiddleware } from "../Middlewares/gamesMiddlewares.js";

const router = Router();


router.get("/games",  getGames);
router.post("/games",postGamesMiddleware, postGames );


export default router;