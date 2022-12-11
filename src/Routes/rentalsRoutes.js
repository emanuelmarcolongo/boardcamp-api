import { Router } from "express";
import {
  getRentalsController,
  postRentalsController,
  postRentalsReturnController,
} from "../Controllers/rentalsController.js";
import { postRentalsMiddleware, postRentalsReturnMiddleware } from "../Middlewares/rentalsMiddleware.js";

const router = Router();

router.post("/rentals", postRentalsMiddleware, postRentalsController);
router.get("/rentals", getRentalsController);
router.post("/rentals/:id/return", postRentalsReturnMiddleware, postRentalsReturnController)

export default router;
