import { Router } from "express";
import {
  getRentalsController,
  postRentalsController,
} from "../Controllers/rentalsController.js";
import { postRentalsMiddleware } from "../Middlewares/rentalsMiddleware.js";

const router = Router();

router.post("/rentals", postRentalsMiddleware, postRentalsController);
router.get("/rentals", getRentalsController);

export default router;
