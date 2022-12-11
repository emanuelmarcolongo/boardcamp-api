import { Router } from "express";
import {
    deleteRentalsController,
  getRentalsController,
  postRentalsController,
  postRentalsReturnController,
} from "../Controllers/rentalsController.js";
import { deleteRentalsMiddleware, postRentalsMiddleware, postRentalsReturnMiddleware } from "../Middlewares/rentalsMiddleware.js";

const router = Router();

router.post("/rentals", postRentalsMiddleware, postRentalsController);
router.get("/rentals", getRentalsController);
router.post("/rentals/:id/return", postRentalsReturnMiddleware, postRentalsReturnController);
router.delete("/rentals/:id",deleteRentalsMiddleware , deleteRentalsController);
export default router;
