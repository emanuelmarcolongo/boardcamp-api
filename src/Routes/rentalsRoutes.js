import { Router } from "express";
import { postRentalsController } from "../Controllers/rentalsController.js";
import { postRentalsMiddleware } from "../Middlewares/rentalsMiddleware.js";


const router = Router();


router.post("/rentals", postRentalsMiddleware, postRentalsController);


export default router;
